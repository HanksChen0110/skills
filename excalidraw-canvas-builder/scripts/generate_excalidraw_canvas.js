#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const vm = require("vm");

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith("--")) continue;
    args[key.slice(2)] = argv[i + 1];
    i += 1;
  }
  return args;
}

function fail(message) {
  console.error("[ERROR] " + message);
  process.exit(1);
}

function loadLzString(vaultPath, pluginPath) {
  const mainPath = pluginPath || path.join(vaultPath, ".obsidian", "plugins", "obsidian-excalidraw-plugin", "main.js");
  if (!fs.existsSync(mainPath)) {
    fail("Cannot find Obsidian Excalidraw plugin main.js: " + mainPath);
  }
  const main = fs.readFileSync(mainPath, "utf8");
  const start = main.indexOf("var LZString=function()");
  const end = main.indexOf(";\"function\"==typeof define", start);
  if (start < 0 || end < 0) {
    fail("Cannot locate LZString in Excalidraw plugin main.js");
  }
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(main.slice(start, end + 1) + ";this.LZString=LZString;", ctx);
  return ctx.LZString;
}

function sanitizeText(value) {
  return String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\^[A-Za-z0-9_-]+/g, "")
    .trim();
}

function chunkBase64(value) {
  const chunks = [];
  for (let i = 0; i < value.length; i += 256) chunks.push(value.slice(i, i + 256));
  return chunks.join("\n\n");
}

let seedCounter = 1000;
let versionCounter = 1;

function baseElement(id, type, x, y, width, height, style = {}) {
  return {
    id,
    type,
    x,
    y,
    width,
    height,
    angle: 0,
    strokeColor: style.strokeColor || "#1e1e1e",
    backgroundColor: style.backgroundColor || "transparent",
    fillStyle: "solid",
    strokeWidth: style.strokeWidth || 2,
    strokeStyle: style.strokeStyle || "solid",
    roughness: style.roughness == null ? 1 : style.roughness,
    opacity: style.opacity == null ? 100 : style.opacity,
    groupIds: [],
    frameId: null,
    roundness: type === "rectangle" ? { type: 3 } : null,
    seed: seedCounter += 17,
    version: versionCounter += 1,
    versionNonce: seedCounter += 31,
    isDeleted: false,
    boundElements: null,
    updated: Date.now(),
    link: null,
    locked: false
  };
}

function rect(id, x, y, width, height, backgroundColor, style = {}) {
  return baseElement(id, "rectangle", x, y, width, height, { ...style, backgroundColor });
}

function ellipse(id, x, y, width, height, backgroundColor, style = {}) {
  return baseElement(id, "ellipse", x, y, width, height, { ...style, backgroundColor });
}

function text(id, x, y, width, value, fontSize = 24, align = "center", color = "#1e1e1e") {
  const clean = sanitizeText(value);
  const lines = Math.max(1, clean.split("\n").length);
  const height = Math.ceil(lines * fontSize * 1.35);
  return {
    ...baseElement(id, "text", x, y, width, height, { strokeColor: color, strokeWidth: 1 }),
    text: clean,
    fontSize,
    fontFamily: 1,
    textAlign: align,
    verticalAlign: "top",
    containerId: null,
    originalText: clean,
    autoResize: true,
    lineHeight: 1.35,
    baseline: Math.ceil(height * 0.78)
  };
}

function arrow(id, fromX, fromY, toX, toY, color = "#868e96") {
  return {
    ...baseElement(id, "arrow", fromX, fromY, Math.abs(toX - fromX), Math.abs(toY - fromY), {
      strokeColor: color,
      strokeWidth: 2
    }),
    points: [[0, 0], [toX - fromX, toY - fromY]],
    lastCommittedPoint: null,
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: "arrow",
    roundness: { type: 2 },
    boundElements: []
  };
}

function polylineArrow(id, points, color = "#868e96") {
  const xs = points.map(point => point.x);
  const ys = points.map(point => point.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const maxX = Math.max(...xs);
  const maxY = Math.max(...ys);
  return {
    ...baseElement(id, "arrow", minX, minY, Math.max(1, maxX - minX), Math.max(1, maxY - minY), {
      strokeColor: color,
      strokeWidth: 2
    }),
    points: points.map(point => [point.x - minX, point.y - minY]),
    lastCommittedPoint: null,
    startBinding: null,
    endBinding: null,
    startArrowhead: null,
    endArrowhead: "arrow",
    roundness: { type: 2 },
    boundElements: []
  };
}

function rectEdgePoint(rectElement, targetX, targetY) {
  const cx = rectElement.x + rectElement.width / 2;
  const cy = rectElement.y + rectElement.height / 2;
  const dx = targetX - cx;
  const dy = targetY - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const scale = Math.min(
    Math.abs((rectElement.width / 2) / (dx || 0.0001)),
    Math.abs((rectElement.height / 2) / (dy || 0.0001))
  );
  return { x: cx + dx * scale, y: cy + dy * scale };
}

function ellipseEdgePoint(ellipseElement, fromX, fromY) {
  const cx = ellipseElement.x + ellipseElement.width / 2;
  const cy = ellipseElement.y + ellipseElement.height / 2;
  const rx = ellipseElement.width / 2;
  const ry = ellipseElement.height / 2;
  const dx = fromX - cx;
  const dy = fromY - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const scale = 1 / Math.sqrt((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry));
  return { x: cx + dx * scale, y: cy + dy * scale };
}

function pointOnRectEdge(point, rectElement) {
  const epsilon = 1.5;
  const withinX = point.x >= rectElement.x - epsilon && point.x <= rectElement.x + rectElement.width + epsilon;
  const withinY = point.y >= rectElement.y - epsilon && point.y <= rectElement.y + rectElement.height + epsilon;
  const onLeft = Math.abs(point.x - rectElement.x) <= epsilon;
  const onRight = Math.abs(point.x - (rectElement.x + rectElement.width)) <= epsilon;
  const onTop = Math.abs(point.y - rectElement.y) <= epsilon;
  const onBottom = Math.abs(point.y - (rectElement.y + rectElement.height)) <= epsilon;
  return withinX && withinY && (onLeft || onRight || onTop || onBottom);
}

function pointOnEllipseEdge(point, ellipseElement) {
  const cx = ellipseElement.x + ellipseElement.width / 2;
  const cy = ellipseElement.y + ellipseElement.height / 2;
  const rx = ellipseElement.width / 2;
  const ry = ellipseElement.height / 2;
  const value = ((point.x - cx) * (point.x - cx)) / (rx * rx) + ((point.y - cy) * (point.y - cy)) / (ry * ry);
  return Math.abs(value - 1) <= 0.04;
}

const palette = {
  blue: "#a5d8ff",
  green: "#b2f2bb",
  yellow: "#ffec99",
  violet: "#d0bfff",
  pink: "#fcc2d7",
  orange: "#ffd8a8",
  teal: "#99e9f2",
  gray: "#e9ecef",
  red: "#ffc9c9",
  white: "#ffffff"
};

function colorFor(key, index = 0) {
  if (key && palette[key]) return palette[key];
  const keys = ["blue", "green", "yellow", "violet", "orange", "teal", "pink", "gray"];
  return palette[keys[index % keys.length]];
}

function safeId(value, fallback) {
  const base = sanitizeText(value).replace(/[^\w\u4e00-\u9fa5]+/g, "_").replace(/^_+|_+$/g, "");
  return base || fallback;
}

function bulletText(items, maxItems = 5) {
  return (Array.isArray(items) ? items : [])
    .map(sanitizeText)
    .filter(Boolean)
    .slice(0, maxItems)
    .map(item => "- " + item)
    .join("\n");
}

function edgePoint(fromShape, toShape) {
  const targetX = toShape.x + toShape.width / 2;
  const targetY = toShape.y + toShape.height / 2;
  return rectEdgePoint(fromShape, targetX, targetY);
}

function shapeCenter(shape) {
  return { x: shape.x + shape.width / 2, y: shape.y + shape.height / 2 };
}

function addTitle(elements, spec, width, centerX) {
  elements.push(text("title", centerX - 380, 40, 760, spec.title, 34, "center"));
  if (spec.subtitle) elements.push(text("subtitle", centerX - 470, 92, 940, spec.subtitle, 20, "center", "#495057"));
  if (spec.diagram && spec.diagram.rationale) {
    elements.push(text("diagramRationale", centerX - 470, 126, 940, spec.diagram.rationale, 16, "center", "#6c757d"));
  }
}

function buildMindmapRadial(spec) {
  const cards = Array.isArray(spec.cards) ? spec.cards : [];
  if (!spec.title || cards.length === 0) {
    fail("Radial spec must include title and at least one card");
  }

  const layout = spec.layout || {};
  const cx = Number(layout.centerX || 620);
  const cy = Number(layout.centerY || 470);
  const cardWidth = Number(layout.cardWidth || 260);
  const cardHeight = Number(layout.cardHeight || 145);
  const radiusX = Number(layout.radiusX || 460);
  const radiusY = Number(layout.radiusY || 260);
  const elements = [];

  addTitle(elements, spec, 1240, cx);

  const centerTitle = sanitizeText((spec.center && spec.center.title) || spec.title);
  const centerLines = spec.center && Array.isArray(spec.center.lines) ? spec.center.lines.map(sanitizeText).filter(Boolean) : [];
  const centerShape = ellipse("centerShape", cx - 145, cy - 80, 290, 160, "#d0ebff");
  elements.push(centerShape);
  elements.push(text("centerTitle", cx - 110, cy - 48, 220, centerTitle, 28, "center"));
  if (centerLines.length) {
    elements.push(text("centerLines", cx - 160, cy + 20, 320, centerLines.join(" / "), 16, "center", "#495057"));
  }

  cards.forEach((card, index) => {
    const angle = -Math.PI / 2 + index * (2 * Math.PI / cards.length);
    const x = Math.round(cx + Math.cos(angle) * radiusX - cardWidth / 2);
    const y = Math.round(cy + Math.sin(angle) * radiusY - cardHeight / 2);
    const id = "card" + String(index + 1).padStart(2, "0");
    const cardShape = rect(id + "Shape", x, y, cardWidth, cardHeight, colorFor(card.color, index));
    elements.push(cardShape);
    elements.push(text(id + "Title", x + 18, y + 18, cardWidth - 36, card.title, 21, "center"));
    elements.push(text(id + "Items", x + 24, y + 58, cardWidth - 48, bulletText(card.items), 15, "left", "#343a40"));
    const start = rectEdgePoint(cardShape, cx, cy);
    const end = ellipseEdgePoint(centerShape, start.x, start.y);
    elements.push(arrow(id + "Connector", start.x, start.y, end.x, end.y));
  });

  if (Array.isArray(spec.flow) && spec.flow.length) {
    const flowText = spec.flow.map(sanitizeText).filter(Boolean).join("  ->  ");
    elements.push(rect("flowShape", cx - 360, cy + radiusY + 155, 720, 70, "#ffffff"));
    elements.push(text("flowText", cx - 330, cy + radiusY + 177, 660, flowText, 18, "center", "#343a40"));
  }

  if (spec.note) {
    elements.push(text("note", cx - 400, cy + radiusY + 255, 800, spec.note, 18, "center", "#495057"));
  }
  return elements;
}

function buildLayeredArchitecture(spec) {
  const layers = Array.isArray(spec.layers) ? spec.layers : [];
  if (!spec.title || layers.length === 0) {
    fail("layered_architecture spec must include title and layers");
  }

  const layout = spec.layout || {};
  const width = Number(layout.width || 1500);
  const left = Number(layout.left || 70);
  const top = Number(layout.top || 165);
  const bandWidth = Number(layout.bandWidth || width - 140);
  const labelWidth = Number(layout.labelWidth || 210);
  const gap = Number(layout.gap || 26);
  const cardMinHeight = Number(layout.cardHeight || 128);
  const rowGap = Number(layout.rowGap || 34);
  const elements = [];
  const nodeShapes = new Map();
  const nodeMeta = new Map();
  const nodeTitles = new Map();
  const layerBands = [];

  addTitle(elements, spec, width, width / 2);

  let y = top;
  layers.forEach((layer, layerIndex) => {
    const nodes = Array.isArray(layer.nodes) ? layer.nodes : (Array.isArray(layer.items) ? layer.items : []);
    const nodeCount = Math.max(1, nodes.length);
    const cardHeight = Math.max(cardMinHeight, Number(layer.height || 0));
    const bandHeight = cardHeight + 48;
    const cardWidth = Math.floor((bandWidth - labelWidth - gap - gap * (nodeCount - 1)) / nodeCount);

    elements.push(rect("layer" + layerIndex + "Band", left, y, bandWidth, bandHeight, colorFor(layer.color || "gray", layerIndex), {
      strokeColor: "#ced4da",
      strokeWidth: 1,
      roughness: 0.5
    }));
    layerBands[layerIndex] = { x: left, y, width: bandWidth, height: bandHeight };
    elements.push(text("layer" + layerIndex + "Title", left + 18, y + 24, labelWidth - 36, layer.title, 22, "center"));
    if (layer.subtitle) {
      elements.push(text("layer" + layerIndex + "Subtitle", left + 20, y + 62, labelWidth - 40, layer.subtitle, 14, "center", "#495057"));
    }

    nodes.forEach((node, nodeIndex) => {
      const x = left + labelWidth + gap + nodeIndex * (cardWidth + gap);
      const nodeId = safeId(node.id || node.title, "layer" + layerIndex + "node" + nodeIndex);
      const shapeId = "node_" + nodeId;
      const shape = rect(shapeId, x, y + 24, cardWidth, cardHeight, colorFor(node.color || layer.nodeColor || "white", nodeIndex), {
        strokeColor: "#495057",
        roughness: 0.6
      });
      nodeShapes.set(node.id || node.title || nodeId, shape);
      nodeShapes.set(nodeId, shape);
      nodeMeta.set(node.id || node.title || nodeId, { layerIndex, nodeIndex, shape });
      nodeMeta.set(nodeId, { layerIndex, nodeIndex, shape });
      nodeTitles.set(node.id || node.title || nodeId, node.title);
      nodeTitles.set(nodeId, node.title);
      elements.push(shape);
      elements.push(text(shapeId + "_title", x + 18, y + 42, cardWidth - 36, node.title, 19, "center"));
      elements.push(text(shapeId + "_items", x + 22, y + 76, cardWidth - 44, bulletText(node.items, 4), 14, "left", "#343a40"));
    });

    y += bandHeight + rowGap;
  });

  const routedNotes = [];
  (Array.isArray(spec.edges) ? spec.edges : []).forEach((edge, index) => {
    const from = nodeShapes.get(edge.from);
    const to = nodeShapes.get(edge.to);
    const fromMeta = nodeMeta.get(edge.from);
    const toMeta = nodeMeta.get(edge.to);
    if (!from || !to) return;
    const layerDistance = fromMeta && toMeta ? Math.abs(fromMeta.layerIndex - toMeta.layerIndex) : 99;
    const nodeDistance = fromMeta && toMeta ? Math.abs(fromMeta.nodeIndex - toMeta.nodeIndex) : 99;
    if (edge.route === "note" || layerDistance > 1 || (layerDistance === 0 && nodeDistance > 1)) {
      routedNotes.push(edge);
      return;
    }

    let points;
    const fromCenter = shapeCenter(from);
    const toCenter = shapeCenter(to);
    if (fromMeta.layerIndex === toMeta.layerIndex) {
      const leftToRight = fromCenter.x <= toCenter.x;
      const start = {
        x: leftToRight ? from.x + from.width : from.x,
        y: fromCenter.y
      };
      const end = {
        x: leftToRight ? to.x : to.x + to.width,
        y: toCenter.y
      };
      points = [start, end];
    } else {
      const fromBand = layerBands[fromMeta.layerIndex];
      const toBand = layerBands[toMeta.layerIndex];
      const down = toMeta.layerIndex > fromMeta.layerIndex;
      const start = {
        x: fromCenter.x,
        y: down ? from.y + from.height : from.y
      };
      const end = {
        x: toCenter.x,
        y: down ? to.y : to.y + to.height
      };
      const channelY = down
        ? (fromBand.y + fromBand.height + toBand.y) / 2
        : (toBand.y + toBand.height + fromBand.y) / 2;
      points = [start, { x: start.x, y: channelY }, { x: end.x, y: channelY }, end];
    }
    elements.push(polylineArrow("edge" + String(index + 1).padStart(2, "0"), points, edge.color || "#495057"));
    if (edge.label) {
      const middle = points[Math.floor(points.length / 2)];
      elements.push(text("edge" + String(index + 1).padStart(2, "0") + "_label", middle.x - 76, middle.y - 24, 152, edge.label, 13, "center", "#495057"));
    }
  });

  if (routedNotes.length) {
    const relationY = y + 8;
    elements.push(text("relationTitle", left, relationY, bandWidth, "跨层关系", 22, "left"));
    const relationShape = rect("relationPanelShape", left, relationY + 34, bandWidth, 94, "#edf2ff", {
      strokeColor: "#5c7cfa",
      roughness: 0.6
    });
    elements.push(relationShape);
    const relationText = routedNotes
      .map((edge, index) => {
        if (edge.note) return `${index + 1}. ${edge.note}`;
        const fromTitle = nodeTitles.get(edge.from) || edge.from;
        const toTitle = nodeTitles.get(edge.to) || edge.to;
        return `${index + 1}. ${edge.label || "关联"}：${fromTitle} -> ${toTitle}`;
      })
      .join("\n");
    elements.push(text("relationPanelText", left + 24, relationY + 54, bandWidth - 48, relationText, 15, "left", "#343a40"));
    y = relationY + 152;
  }

  if (Array.isArray(spec.flow) && spec.flow.length) {
    const flowY = y + 8;
    const flowWidth = Math.floor((bandWidth - gap * (spec.flow.length - 1)) / spec.flow.length);
    elements.push(text("mainFlowTitle", left, flowY - 34, bandWidth, "主流程", 22, "left"));
    spec.flow.forEach((step, index) => {
      const x = left + index * (flowWidth + gap);
      const stepShape = rect("flow" + index + "Shape", x, flowY, flowWidth, 78, "#fff3bf", {
        strokeColor: "#f08c00",
        roughness: 0.6
      });
      elements.push(stepShape);
      elements.push(text("flow" + index + "Text", x + 16, flowY + 20, flowWidth - 32, step, 16, "center", "#343a40"));
      if (index > 0) {
        const prevX = left + (index - 1) * (flowWidth + gap) + flowWidth;
        elements.push(arrow("flow" + index + "Arrow", prevX + 4, flowY + 39, x - 4, flowY + 39));
      }
    });
    y = flowY + 115;
  }

  if (Array.isArray(spec.feedbackLoops) && spec.feedbackLoops.length) {
    const loopY = y + 36;
    const loopWidth = Math.floor((bandWidth - gap * (spec.feedbackLoops.length - 1)) / spec.feedbackLoops.length);
    elements.push(text("feedbackTitle", left, loopY - 34, bandWidth, "反馈闭环 / 旁路验证", 22, "left"));
    spec.feedbackLoops.forEach((loop, index) => {
      const x = left + index * (loopWidth + gap);
      const loopShape = rect("feedback" + index + "Shape", x, loopY, loopWidth, 104, colorFor(loop.color || "teal", index), {
        strokeColor: "#0b7285",
        roughness: 0.6
      });
      elements.push(loopShape);
      elements.push(text("feedback" + index + "Title", x + 16, loopY + 18, loopWidth - 32, loop.title, 17, "center"));
      elements.push(text("feedback" + index + "Items", x + 18, loopY + 50, loopWidth - 36, bulletText(loop.items, 3), 13, "left", "#343a40"));
      if (index > 0) {
        const prevX = left + (index - 1) * (loopWidth + gap) + loopWidth;
        elements.push(arrow("feedback" + index + "Arrow", prevX + 4, loopY + 52, x - 4, loopY + 52, "#0b7285"));
      }
    });
    y = loopY + 130;
  }

  if (spec.note) {
    elements.push(text("note", left, y + 22, bandWidth, spec.note, 18, "center", "#495057"));
  }
  return elements;
}

function buildSwimlaneFlow(spec) {
  const lanes = Array.isArray(spec.lanes) ? spec.lanes : [];
  if (!spec.title || lanes.length === 0) fail("swimlane_flow spec must include title and lanes");
  const elements = [];
  const width = Number((spec.layout && spec.layout.width) || 1400);
  const left = 70;
  const top = 165;
  const laneLabelWidth = 190;
  const stepWidth = 210;
  const stepGap = 28;
  const laneHeight = 135;
  addTitle(elements, spec, width, width / 2);

  lanes.forEach((lane, laneIndex) => {
    const y = top + laneIndex * (laneHeight + 26);
    const steps = Array.isArray(lane.steps) ? lane.steps : (Array.isArray(lane.items) ? lane.items : []);
    const laneWidth = laneLabelWidth + steps.length * stepWidth + Math.max(0, steps.length - 1) * stepGap + 50;
    elements.push(rect("lane" + laneIndex + "Band", left, y, laneWidth, laneHeight, colorFor(lane.color || "gray", laneIndex), { strokeColor: "#ced4da", strokeWidth: 1 }));
    elements.push(text("lane" + laneIndex + "Title", left + 18, y + 42, laneLabelWidth - 36, lane.title, 20, "center"));
    steps.forEach((step, stepIndex) => {
      const x = left + laneLabelWidth + 28 + stepIndex * (stepWidth + stepGap);
      elements.push(rect("lane" + laneIndex + "Step" + stepIndex, x, y + 24, stepWidth, 86, colorFor(step.color || "white", stepIndex), { strokeColor: "#495057" }));
      elements.push(text("lane" + laneIndex + "Step" + stepIndex + "Text", x + 14, y + 42, stepWidth - 28, step.title || step, 16, "center"));
      if (stepIndex > 0) {
        elements.push(arrow("lane" + laneIndex + "Arrow" + stepIndex, x - stepGap + 4, y + 67, x - 4, y + 67));
      }
    });
  });
  if (spec.note) elements.push(text("note", left, top + lanes.length * (laneHeight + 26) + 20, width - 140, spec.note, 18, "center", "#495057"));
  return elements;
}

function buildTimeline(spec) {
  const events = Array.isArray(spec.events) ? spec.events : (Array.isArray(spec.nodes) ? spec.nodes : []);
  if (!spec.title || events.length === 0) fail("timeline spec must include title and events");
  const elements = [];
  const width = Number((spec.layout && spec.layout.width) || 1400);
  const left = 90;
  const top = 265;
  const cardWidth = 220;
  const gap = 45;
  addTitle(elements, spec, width, width / 2);
  elements.push(arrow("timelineAxis", left, top, left + events.length * (cardWidth + gap) - gap, top, "#495057"));
  events.forEach((event, index) => {
    const x = left + index * (cardWidth + gap);
    const y = top + (index % 2 === 0 ? -150 : 52);
    elements.push(rect("event" + index + "Shape", x, y, cardWidth, 110, colorFor(event.color || "blue", index), { strokeColor: "#495057" }));
    elements.push(text("event" + index + "Title", x + 14, y + 18, cardWidth - 28, event.title, 17, "center"));
    elements.push(text("event" + index + "Items", x + 18, y + 50, cardWidth - 36, bulletText(event.items, 3), 13, "left", "#343a40"));
    elements.push(arrow("event" + index + "Line", x + cardWidth / 2, y + (index % 2 === 0 ? 110 : 0), x + cardWidth / 2, top));
  });
  if (spec.note) elements.push(text("note", left, top + 220, width - 180, spec.note, 18, "center", "#495057"));
  return elements;
}

function buildComparisonMatrix(spec) {
  const columns = Array.isArray(spec.columns) ? spec.columns : [];
  const rows = Array.isArray(spec.rows) ? spec.rows : [];
  if (!spec.title || columns.length === 0 || rows.length === 0) fail("comparison_matrix spec must include title, columns, and rows");
  const elements = [];
  const width = Number((spec.layout && spec.layout.width) || 1400);
  const left = 70;
  const top = 165;
  const rowLabelWidth = 210;
  const colWidth = Math.floor((width - 140 - rowLabelWidth) / columns.length);
  const rowHeight = 96;
  addTitle(elements, spec, width, width / 2);
  elements.push(rect("cornerCell", left, top, rowLabelWidth, 70, "#e9ecef"));
  columns.forEach((column, index) => {
    const x = left + rowLabelWidth + index * colWidth;
    elements.push(rect("column" + index, x, top, colWidth, 70, colorFor(column.color || "blue", index)));
    elements.push(text("column" + index + "Text", x + 12, top + 22, colWidth - 24, column.title || column, 18, "center"));
  });
  rows.forEach((row, rowIndex) => {
    const y = top + 70 + rowIndex * rowHeight;
    elements.push(rect("row" + rowIndex + "Label", left, y, rowLabelWidth, rowHeight, "#f1f3f5"));
    elements.push(text("row" + rowIndex + "LabelText", left + 14, y + 30, rowLabelWidth - 28, row.title, 16, "center"));
    (row.cells || []).forEach((cell, colIndex) => {
      const x = left + rowLabelWidth + colIndex * colWidth;
      elements.push(rect("row" + rowIndex + "Cell" + colIndex, x, y, colWidth, rowHeight, "#ffffff", { strokeColor: "#ced4da", strokeWidth: 1 }));
      elements.push(text("row" + rowIndex + "Cell" + colIndex + "Text", x + 14, y + 18, colWidth - 28, sanitizeText(cell), 14, "left", "#343a40"));
    });
  });
  if (spec.note) elements.push(text("note", left, top + 90 + rows.length * rowHeight, width - 140, spec.note, 18, "center", "#495057"));
  return elements;
}

function buildTopologyMap(spec) {
  const nodes = Array.isArray(spec.nodes) ? spec.nodes : [];
  if (!spec.title || nodes.length === 0) fail("topology_map spec must include title and nodes");
  const elements = [];
  const width = Number((spec.layout && spec.layout.width) || 1400);
  const left = 80;
  const top = 180;
  const nodeWidth = 230;
  const nodeHeight = 104;
  const nodeShapes = new Map();
  addTitle(elements, spec, width, width / 2);
  nodes.forEach((node, index) => {
    const col = node.x == null ? index % 4 : Number(node.x);
    const row = node.y == null ? Math.floor(index / 4) : Number(node.y);
    const x = left + col * 310;
    const y = top + row * 170;
    const id = safeId(node.id || node.title, "topology" + index);
    const shape = rect("node_" + id, x, y, nodeWidth, nodeHeight, colorFor(node.color || "blue", index), { strokeColor: "#495057" });
    nodeShapes.set(node.id || node.title || id, shape);
    nodeShapes.set(id, shape);
    elements.push(shape);
    elements.push(text("node_" + id + "_title", x + 14, y + 18, nodeWidth - 28, node.title, 18, "center"));
    elements.push(text("node_" + id + "_items", x + 16, y + 52, nodeWidth - 32, bulletText(node.items, 2), 13, "left", "#343a40"));
  });
  (Array.isArray(spec.edges) ? spec.edges : []).forEach((edge, index) => {
    const from = nodeShapes.get(edge.from);
    const to = nodeShapes.get(edge.to);
    if (!from || !to) return;
    const start = edgePoint(from, to);
    const end = edgePoint(to, from);
    elements.push(arrow("edge" + index, start.x, start.y, end.x, end.y, edge.color || "#495057"));
  });
  if (spec.note) elements.push(text("note", left, top + 520, width - 160, spec.note, 18, "center", "#495057"));
  return elements;
}

function buildScene(spec) {
  const diagramType = sanitizeText(spec.diagram && spec.diagram.type);
  let elements;
  if (!diagramType && spec.center && Array.isArray(spec.cards)) {
    elements = buildMindmapRadial(spec);
  } else if (diagramType === "layered_architecture") {
    elements = buildLayeredArchitecture(spec);
  } else if (diagramType === "swimlane_flow") {
    elements = buildSwimlaneFlow(spec);
  } else if (diagramType === "timeline") {
    elements = buildTimeline(spec);
  } else if (diagramType === "comparison_matrix") {
    elements = buildComparisonMatrix(spec);
  } else if (diagramType === "topology_map") {
    elements = buildTopologyMap(spec);
  } else if (diagramType === "mindmap_radial") {
    elements = buildMindmapRadial(spec);
  } else {
    fail("Unsupported diagram.type: " + (diagramType || "missing"));
  }

  return {
    type: "excalidraw",
    version: 2,
    source: "https://github.com/zsviczian/obsidian-excalidraw-plugin",
    elements,
    appState: {
      viewBackgroundColor: (spec.theme && spec.theme.background) || "#fffaf0",
      gridSize: null
    },
    files: {}
  };
}

function buildMarkdown(scene, lzString) {
  const compressed = chunkBase64(lzString.compressToBase64(JSON.stringify(scene, null, "\t")));
  return `---\n\nexcalidraw-plugin: parsed\ntags: [excalidraw]\n\n---\n==Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document.== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'\n\n\n# Excalidraw Data\n\n## Text Elements\n\n%%\n## Drawing\n\`\`\`compressed-json\n${compressed}\n\`\`\`\n%%\n`;
}

function validateScene(parsed, markdown) {
  const textElements = parsed.elements.filter(e => e.type === "text");
  const badTextElements = textElements.filter(e => /\^[A-Za-z0-9_-]+/.test(e.text || "")).length;
  const hasTextElementsIndex = /## Text Elements/.test(markdown);
  const textElementsSection = markdown.match(/## Text Elements\s*([\s\S]*?)\n%%\n## Drawing/);
  const textIndexChars = textElementsSection ? textElementsSection[1].trim().length : -1;
  const nullArrowheads = parsed.elements.filter(e => e.type === "arrow" && e.endArrowhead == null).length;
  const centerShape = parsed.elements.find(e => e.id === "centerShape");
  let connectorEdgeIssues = 0;
  for (const connector of parsed.elements.filter(e => /Connector$/.test(e.id))) {
    const match = connector.id.match(/^(card\d+)Connector$/);
    if (!match) continue;
    const cardShape = parsed.elements.find(e => e.id === match[1] + "Shape");
    if (!cardShape || !centerShape) {
      connectorEdgeIssues += 1;
      continue;
    }
    const start = { x: connector.x + connector.points[0][0], y: connector.y + connector.points[0][1] };
    const end = { x: connector.x + connector.points[1][0], y: connector.y + connector.points[1][1] };
    if (!pointOnRectEdge(start, cardShape) || !pointOnEllipseEdge(end, centerShape)) {
      connectorEdgeIssues += 1;
    }
  }
  return { textElements, badTextElements, hasTextElementsIndex, textIndexChars, nullArrowheads, connectorEdgeIssues };
}

function main() {
  const args = parseArgs(process.argv);
  if (!args.vault) fail("Missing --vault");
  if (!args.spec) fail("Missing --spec");
  if (!args.output) fail("Missing --output");

  const vaultPath = path.resolve(args.vault);
  const specPath = path.resolve(args.spec);
  const outputPath = path.isAbsolute(args.output) ? args.output : path.join(vaultPath, args.output);
  const spec = JSON.parse(fs.readFileSync(specPath, "utf8").replace(/^\uFEFF/, ""));
  const lzString = loadLzString(vaultPath, args.plugin);
  const scene = buildScene(spec);
  const markdown = buildMarkdown(scene, lzString);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, markdown, "utf8");

  const roundTrip = markdown.match(/```compressed-json\s*([\s\S]*?)\s*```/)[1].replace(/[\r\n]/g, "");
  const parsed = JSON.parse(lzString.decompressFromBase64(roundTrip));
  const validation = validateScene(parsed, markdown);

  console.log("wrote=" + outputPath);
  console.log("elements=" + parsed.elements.length);
  console.log("textElements=" + validation.textElements.length);
  console.log("badTextElements=" + validation.badTextElements);
  console.log("hasTextElementsIndex=" + validation.hasTextElementsIndex);
  console.log("textIndexChars=" + validation.textIndexChars);
  console.log("nullArrowheads=" + validation.nullArrowheads);
  console.log("connectorEdgeIssues=" + validation.connectorEdgeIssues);
}

main();

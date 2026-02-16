# Avoiding Biases in User Research

Based on "Thinking, Fast and Slow" by Daniel Kahneman

## Two Selves in User Research

### Experience Self vs Memory Self

**Experience Self**: Real-time feelings during actual usage
**Memory Self**: Retrospective evaluation after usage

**Key Insight**: Users make decisions based on memory self, but experience self determines actual usage.

### Measuring Experience Self

**Methods**:
- Real-time analytics (time on task, error rates, completion rates)
- Session recordings (watch actual behavior)
- Eye tracking (where users look)
- Physiological measures (heart rate, stress)

**What to Measure**:
- Task completion time
- Error frequency and types
- Drop-off points
- Click patterns
- Time spent on each step

**Example**:
- Track: User takes 5 minutes to complete onboarding (experience)
- Ask: "How long did that take?" User says "2 minutes" (memory)
- Insight: Memory self underestimates time, experience self shows friction

### Measuring Memory Self

**Methods**:
- Surveys (post-task, post-session)
- Interviews (retrospective)
- Net Promoter Score (NPS)
- Customer Satisfaction (CSAT)

**What to Measure**:
- Overall satisfaction
- Likelihood to recommend
- Perceived ease of use
- Emotional response
- Key moments remembered

**Example**:
- Ask: "How was your experience?" User says "Great!" (memory)
- But: Analytics show high drop-off rate (experience)
- Insight: Memory self positive (peak-end rule), but experience self shows problems

### Reconciling Conflicts

**When memory and experience conflict**:

1. **Memory positive, experience negative**: 
   - Users remember good moments but don't use regularly
   - Action: Improve actual experience, not just memorable moments

2. **Memory negative, experience positive**:
   - Users had good experience but remember it poorly
   - Action: Improve ending moments, fix peak negative experiences

3. **Both negative**:
   - Real problem exists
   - Action: Redesign the experience

## Peak-End Rule in Research

### Understanding Peak-End Rule

Users remember:
- **Peak**: Most intense moment (positive or negative)
- **End**: Final moment of the experience
- **Not**: The full experience or duration

### Research Implications

**What Users Remember**:
- Memorable moments (good or bad)
- How the experience ended
- Not the average experience
- Not the duration

**Research Methods**:
- Ask about specific moments: "What was the best moment? Worst moment?"
- Ask about ending: "How did you feel at the end?"
- Don't rely only on overall ratings
- Measure full journey, not just highlights

**Example**:
- User says: "I loved the onboarding!" (remembering peak moment)
- But: Analytics show 50% drop-off (full experience)
- Insight: Peak was good, but overall experience has problems

### Designing Research for Peak-End

**Questions to Ask**:
- "What was the most memorable moment?" (peak)
- "How did you feel when you finished?" (end)
- "What was the best part?" (positive peak)
- "What was the worst part?" (negative peak)
- "How long did it take?" (duration - often inaccurate)

**Analytics to Track**:
- Peak moments: Error rates, completion celebrations, friction points
- End moments: Final page views, completion rates, exit surveys
- Full journey: Full session recordings, step-by-step analytics

## Framing Effect in Questions

### How Framing Affects Answers

**Positive Frame**: "How much do you like this feature?"
- Tends to get more positive responses

**Negative Frame**: "How much do you dislike this feature?"
- Tends to get more negative responses

**Neutral Frame**: "How would you rate this feature?"
- Most accurate

### Best Practices

**1. Use Neutral Language**:
- ❌ "How much do you love this?"
- ✅ "How would you rate this?"
- ❌ "Was this frustrating?"
- ✅ "How easy or difficult was this?"

**2. Avoid Leading Questions**:
- ❌ "Don't you think this is better?"
- ✅ "How does this compare to the previous version?"

**3. Test Different Framings**:
- A/B test question framings
- Compare results across framings
- Use framing that matches research goal

**4. Randomize Order**:
- Don't always ask positive questions first
- Randomize question order
- Avoid anchoring effects

## Anchoring in Research

### How Anchoring Works

Initial information anchors subsequent judgments.

**In Research**:
- First question anchors expectations
- Example given anchors responses
- Initial impression anchors overall evaluation

### Avoiding Anchoring Bias

**1. Randomize Question Order**:
- Don't always ask easy questions first
- Mix positive and negative questions
- Vary question sequences

**2. Be Aware of Examples**:
- Examples given anchor responses
- Use diverse examples
- Or avoid examples entirely

**3. Test Without Context**:
- Sometimes test without showing previous versions
- Avoid comparison anchoring
- Test in isolation when appropriate

**4. Clear Instructions**:
- Set clear expectations
- Don't imply desired answers
- Use neutral instructions

## Availability Bias in Research

### How Availability Bias Works

Recent or vivid examples dominate thinking.

**In Research**:
- Recent feedback dominates decisions
- Vivid complaints get over-weighted
- Silent users are ignored

### Avoiding Availability Bias

**1. Diverse Sampling**:
- Don't only talk to engaged users
- Reach out to silent users
- Include churned users
- Sample across user segments

**2. Build Feedback Database**:
- Maintain historical feedback log
- Review feedback from past periods
- Don't over-weight recent feedback
- Look for patterns over time

**3. Quantitative + Qualitative**:
- Use quantitative data (not just anecdotes)
- Balance qualitative insights with numbers
- Don't let one angry user drive decisions
- Look at aggregate patterns

**4. Systematic Collection**:
- Regular feedback collection (not just when problems arise)
- Structured feedback forms
- Consistent questions over time
- Track feedback trends

## Confirmation Bias in Research

### How Confirmation Bias Works

Seeking evidence that confirms existing beliefs.

**In Research**:
- Only asking about benefits
- Ignoring negative feedback
- Testing with friendly users
- Interpreting ambiguous feedback positively

### Avoiding Confirmation Bias

**1. Actively Seek Disconfirming Evidence**:
- Ask about problems, not just benefits
- "What would make you not use this?"
- Test with skeptical users
- Look for reasons to reject your design

**2. Listen to Criticism**:
- Don't dismiss negative feedback
- Investigate complaints thoroughly
- Look for patterns in criticism
- Address valid concerns

**3. Test with Diverse Users**:
- Include users outside target audience
- Test with users who might not like it
- Get feedback from different perspectives
- Don't only test with friendly users

**4. Ask Open-Ended Questions**:
- "What problems did you encounter?"
- "What would you change?"
- "What didn't work for you?"
- Avoid yes/no questions that confirm beliefs

## Research Quality Checklist

A high-quality user research process should have:

- ✅ **Both Selves Measured**: Experience self (analytics) + Memory self (surveys)
- ✅ **Peak-End Understood**: Asked about specific moments and endings
- ✅ **Neutral Framing**: Questions are neutral and unbiased
- ✅ **No Anchoring**: Question order randomized, examples diverse
- ✅ **Diverse Sampling**: Reached silent users, churned users, diverse segments
- ✅ **Historical Context**: Reviewed past feedback, not just recent
- ✅ **Disconfirming Evidence**: Actively sought negative feedback
- ✅ **Quantitative + Qualitative**: Balanced numbers with insights

## Red Flags in Research

Stop and reconsider if you notice:

- 🚩 Users say they love it but don't use it (two selves conflict)
- 🚩 Only positive feedback collected (confirmation bias)
- 🚩 Recent feedback dominating decisions (availability bias)
- 🚩 Questions are leading or framed positively (framing effect)
- 🚩 Only talking to engaged users (availability bias)
- 🚩 Ignoring negative feedback (confirmation bias)
- 🚩 No quantitative data, only anecdotes (availability bias)


























































# Audio quality M and SD
full_sample %>%
  group_by(audio_quality) %>%
  summarise(
    n = n(),
    M = mean(hire, na.rm = TRUE),
    SD = sd(hire, na.rm = TRUE)
  )



# Voice type main effect
emm_voice <- emmeans(model_hire, ~ voice_type)
pairs(emm_voice)
eff_size(emm_voice, sigma = sigma(model_hire), edf = df.residual(model_hire))

# Descriptive stats
full_sample %>%
  group_by(voice_type) %>%
  summarise(
    n = n(),
    M = mean(hire),
    SD = sd(hire)
  )

# All four conditions
full_sample %>%
  group_by(audio_quality, voice_type) %>%
  summarise(
    n = n(),
    M = mean(hire),
    SD = sd(hire)
  )

# Voice type comparison
emm_voice <- emmeans(model_hire, ~ voice_type)
pairs(emm_voice)
eff_size(emm_voice, sigma = sigma(model_hire), edf = df.residual(model_hire))

# Voice type comparison
emm_intel_voice <- emmeans(model_intel, ~ voice_type)
pairs(emm_intel_voice)
eff_size(emm_intel_voice, sigma = sigma(model_intel), edf = df.residual(model_intel))

full_sample %>%
  group_by(voice_type) %>%
  summarise(
    n = n(),
    M = mean(intelligence),
    SD = sd(intelligence)
  )

full_sample %>%
  group_by(audio_quality, voice_type) %>%
  summarise(
    n = n(),
    M = mean(intelligence),
    SD = sd(intelligence)
  )

cor.test(full_sample$hire, full_sample$intelligence)

# Simple effects
emm_simple <- emmeans(model_hire, ~ audio_quality | voice_type)
pairs(emm_simple)
eff_size(emm_simple, sigma = sigma(model_hire), edf = df.residual(model_hire))
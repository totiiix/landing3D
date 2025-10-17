# 🚗 Car Sound Effects

This folder contains the sound effects for the car exit feature.

## Audio Files

Place your custom MP3 files here with these exact names:

- **door-open.mp3** - Sound when the car door opens
- **door-close.mp3** - Sound when the car door closes
- **engine-start.mp3** - Sound when the car engine starts
- **engine-driving.mp3** - Sound while the car is driving (this will loop)

## Configuration

Sounds are configured in `src/config/audioConfig.ts`:
- Paths in `AUDIO_PATHS.sfx`
- Volumes in `AUDIO_VOLUMES`

## Customization

1. Replace any of the MP3 files with your own sounds
2. Keep the same filenames
3. The game will automatically use your custom sounds
4. Recommended format: MP3, 44.1kHz, stereo

## Default Settings

- **door-open.mp3** & **door-close.mp3**: Volume 40%
- **engine-start.mp3**: Volume 50%
- **engine-driving.mp3**: Volume 30% (loops)

## Tips

- **door-open.mp3**: Short sound (0.5-1s), creaky or click sound
- **door-close.mp3**: Short sound (0.5-1s), slam or thud sound
- **engine-start.mp3**: Medium sound (1-2s), ignition and revving
- **engine-driving.mp3**: Looping sound (3-5s), steady engine hum

## Timeline

```
0.0s  → Player presses E
0.0s  → 🔊 door-open.mp3
0.8s  → 🔊 door-close.mp3
1.7s  → 🔊 engine-start.mp3
2.7s  → 🔊 engine-driving.mp3 (LOOP)
5.7s  → Animation complete
```

## Free Sound Resources

- [Freesound.org](https://freesound.org/)
- [Zapsplat.com](https://www.zapsplat.com/)
- [Mixkit.co](https://mixkit.co/free-sound-effects/)
- [BBC Sound Effects](https://sound-effects.bbcrewind.co.uk/)

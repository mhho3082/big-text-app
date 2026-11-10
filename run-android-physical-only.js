const { execSync } = require('child_process');

try {
  // Get output from 'adb devices'
  const adbOutput = execSync('adb devices', { encoding: 'utf8' });

  // Parse lines to find connected devices
  const lines = adbOutput
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);
  const devices = [];

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(/\s+/);
    if (parts.length >= 2 && parts[1] === 'device') {
      devices.push(parts[0]);
    }
  }

  // Filter out emulator instances (ADB typically prefixes emulators with 'emulator-')
  const physicalDevices = devices.filter(id => !id.startsWith('emulator-'));

  if (physicalDevices.length === 0) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      '❌ Error: No external physical Android device found via ADB!',
    );
    process.exit(1);
  }

  const targetDevice = physicalDevices[0];
  console.log(
    '\x1b[32m%s\x1b[0m',
    `✅ Targeting physical device: ${targetDevice}`,
  );

  // Run React Native CLI targeting the specific physical device ID
  execSync(`npx react-native run-android --deviceId ${targetDevice}`, {
    stdio: 'inherit',
  });
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Failed to execute build script.');
  process.exit(1);
}

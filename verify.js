const { execSync } = require('child_process');

console.log('Starting Build Verification...');
try {
    // Run build
    const output = execSync('npm run build', { encoding: 'utf8', stdio: 'pipe', shell: true });
    console.log(output);
    console.log('BUILD SUCCESSFUL');
} catch (e) {
    console.error('BUILD FAILED');
    console.error(e.message);
    if (e.stdout) console.log('STDOUT:', e.stdout);
    if (e.stderr) console.error('STDERR:', e.stderr);
    process.exit(1);
}

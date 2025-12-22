export default {
  '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '../**/*.go': (filenames) => {
    const filesToFormat = filenames.map((f) => `"${f}"`).join(' ');
    return [`gofumpt -w ${filesToFormat}`, 'npm run lint:backend'];
  },
};

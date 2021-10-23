module.exports = {
  "branches": ['+([0-9])?(.{+([0-9]),x}).x', 'master', 'next', 'develop', {name: 'beta', prerelease: true}, {name: 'alpha', prerelease: true}],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/npm", {
      "tarballDir": "release"
    }],
    ["@semantic-release/github", {
      "assets": "release/*.tgz"
    }],
    "@semantic-release/git"
  ],
  "preset": "angular"
}

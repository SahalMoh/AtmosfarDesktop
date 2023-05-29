module.exports = {
  packagerConfig: {
    icon: 'src/assets/images/icon.png',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Atmosfar',
        iconUrl: 'https://atmosfar.netlify.app/assets/images/icon.ico',
        setupIcon: 'src/assets/images/icon.ico',
        config: {
          certificateFile: './cert.pfx',
          certificatePassword: process.env.CERT_PASSWORD,
        },
      },
    },
    {
      name: '@electron-forge/maker-zip',
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'SahalMoh',
          name: 'AtmosfarDesktop',
        },
        authToken: process.env.GITHUB_TOKEN,
        draft: true,
      }
    }
  ]
};

module.exports = {
  packagerConfig: {
    icon: 'src/assets/icons/icon.ico',
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'Atmosfar',
        iconUrl: 'https://atmosfar.netlify.app/assets/images/icon.ico',
        setupIcon: 'src/assets/icons/icon.ico',
        config: {
          certificateFile: './cert.pfx',
          certificatePassword: process.env.CERT_PASSWORD,
        },
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
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
        draft: false,
      }
    }
  ]
};

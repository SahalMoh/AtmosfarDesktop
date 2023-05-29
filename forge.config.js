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
        certificateFile: './cert.pfx',
        certificatePassword: 'atmosfar_Sahal@16022006',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
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
        authToken: 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,
        draft: true,
        prerelease: true
      }
    }
  ]
};

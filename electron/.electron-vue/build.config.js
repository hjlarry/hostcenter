const path = require('path')

/**
 * `electron-packager` options
 * ,
 osxSign:{
    identity:'3rd Party Mac Developer Application: qipeng dai (QN839WA57K)',
    entitlements:path.join(__dirname, '../build/parent.plist'),
    'entitlements-inherit':path.join(__dirname, '../build/child.plist')
  }
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-packager.html
 */
module.exports = {
  arch: 'x64',
  asar: true,
  dir: path.join(__dirname, '../'),
  icon: path.join(__dirname, '../build/icons/icon'),
  ignore: /(^\/(src|test|\.[a-z]+|README|yarn|static|dist\/web))|\.gitkeep/,
  out: path.join(__dirname, '../build'),
  overwrite: true,
  platform: process.env.BUILD_TARGET || 'all',
  appBundleId:'com.lessney.iHost',
  buildVersion:'20170627001',
  extendInfo:{
    ElectronTeamID:'QN839WA57K',
    ITSAppUsesNonExemptEncryption:false,
    NSAppTransportSecurity:{
      NSAllowsArbitraryLoads:true
    }
  }
}

import { createTheme} from '@mui/material/styles';

const overrides = {
  MuiPagination:{
    ul:{
      justifyContent: 'center',
    }
  }
}
export const muiTheme = createTheme({
  palette:{
    primary:{
      main: "#1760a5",
      light: "skyblue"
    },
    secondary:{
      main: '#15c630',
    },
    otherColor:{
      main:"#999"
    }
  },
  typography: {
    button: {
      //
      textTransform: 'none'
    }
  }
})
// const muiTheme = createTheme({
//   overrides,
//   palette: {
//     background: {
//       default: '#EDEEF2',
//       primary: 'white',
//       secondary: '#F2F2F2'
//     },
//     primary: {
//       default: '#25B88E',
//       light: '#25B88E',
//       main: '#25B88E',
//       dark: '#197B5F',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',

//     },
//     message:{
//       subinfo: '#9DB2AD',
//       info: '#32B38E',
//       warning: '#FAA646',
//       error: '#FF4757',
//       alarm: '#FF4757',
//     },
//     text:{
//       primary: '#001529',
//       secondary: '#000000',
//     },
//     divider:'#001529',
//   },

//   font:{
//     size:{
//       mainTitle: '16px',
//       subTitle: '12px',
//       content: '14px',
//       hint: '12px',
//     },
//   },
//   typography:{
//     fontFamily:[
//       'PingFangSC-Regular',
//       'PingFang SC',
//       'Microsoft YaHei',
//     ].join(','),
//     // htmlFontSize: 10,
//     h1:{
//       fontSize: 16,
//       fontWeight: 600,
//     },
//     h2:{
//       fontSize: 14,
//       fontWeight:600,
//       lineHeight:'unset',
//     },
//     body1:{
//       fontSize: 14,
//       fontWeight: 400,
//     },
//     body2:{
//       fontSize: 12,
//       fontWeight: 400,
//     },
//     caption:{
//       fontSize: 16,
//       fontWeight: 500,
//     }
//   },

//   appBar: {
//     height: '64px',
//   },
// });

export default muiTheme;

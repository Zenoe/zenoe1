// project import
import Routes from './routes'
import ThemeCustomization from './themes'
import ScrollTop from '@/components/ScrollTop'

import { IntlProvider } from 'react-intl'
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <ThemeCustomization>
      <IntlProvider locale="en" messages={{}}>
        <ScrollTop>
            <Routes />
        </ScrollTop>
      </IntlProvider>
    </ThemeCustomization>
)

export default App

// import React from 'react'
// import { getMessages } from '../i18n/intlUtility';
// import { injectIntl, IntlProvider } from 'react-intl';
// import PropTypes from 'prop-types';

// export function withIntl (Component){
//     let InjectedComponent;

//     class WithIntl extends React.Component{

//         constructor(props){
//             super(props);
//             InjectedComponent = injectIntl(Component);
//         }

//         render(){
//             // eslint-disable-next-line react/prop-types
//             const { userInfo: { locale } } = this.props;

//             return (
//                 <IntlProvider locale={locale} messages={getMessages(locale)}>
//                     <InjectedComponent {...this.props} />
//                 </IntlProvider>
//             );
//         }
//     }

//     WithIntl.propTypes = {
//         // userInfo: PropTypes.object
//         userInfo: PropTypes.shape({
//             locale: PropTypes.string.isRequired
//         })
//     }
    
//     WithIntl.displayName = `WithIntl(${Component.displayName})`;

//     return withIntl;
// }

import PropTypes from 'prop-types'
import React from 'react'
import { injectIntl, IntlProvider } from 'react-intl'
import { getMessages } from '../i18n/intlUtility'

export function withIntl(Component) {
    const InjectedComponent = injectIntl(Component)

    class WithIntl extends React.Component {
        render() {
            const { userInfo: { locale } = {} } = this.props

            return (
                <IntlProvider locale={locale} messages={getMessages(locale)}>
                    <InjectedComponent {...this.props} />
                </IntlProvider>
            )
        }
    }

    WithIntl.propTypes = {
        userInfo: PropTypes.shape({
            locale: PropTypes.string
        })
    }

    WithIntl.displayName = WithIntl(`${Component.displayName || Component.name || 'Component'}`)

    return WithIntl
}
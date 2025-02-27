// https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root
import '@near-wallet-selector/modal-ui/styles.css';

import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser'; // https://docusaurus.io/docs/advanced/ssg#useisbrowser
import Gleap from "gleap"; // See https://gleap.io/docs/javascript/ and https://app.gleap.io/projects/62697858a4f6850036ae2e6a/widget
import { withRouter } from 'react-router-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { setupAlgoliaEvents } from './algolia-events';

import { useInitWallet } from './Gateway/wallet-selector';

const GLEAP_API_KEY = 'K2v3kvAJ5XtPzNYSgk4Ulpe5ptgBkIMv';

function Root({ children, history }) {
    useInitWallet({ createAccessKeyFor: 'v1.social08.testnet' , networkId: 'testnet' });
    const isBrowser = useIsBrowser();
    const docusaurusContext = useDocusaurusContext();
    if (isBrowser) {
        Gleap.initialize(GLEAP_API_KEY);
        setupAlgoliaEvents(docusaurusContext, history);
    }
    return <>{children}</>;
}

export default withRouter(Root);
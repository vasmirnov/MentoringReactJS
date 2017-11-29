import * as React from 'react';
import { withRouter } from 'react-router'

export const App = withRouter(({ history, children }) => (
    <div>
        {children}
    </div>
)) 
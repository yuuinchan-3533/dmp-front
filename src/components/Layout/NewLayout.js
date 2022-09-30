/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

 import React, { useState } from "react";
 import cx from 'classnames';
 import { Switch, Route, withRouter } from 'react-router';
 
 import s from './Layout.module.scss';
 import NewHeader from '../Header';
 import Footer from '../Footer';
 import Sidebar from '../Sidebar';
 
 // Dashboard component is loaded directly as an example of server side rendering
 import Dashboard from '../../pages/dashboard'
 import User from '../../pages/user/Users'
 import Images from '../../pages/images/Image'
 import Containers from '../../pages/containers'
 import Buttons from '../../pages/buttons'
 import Charts from '../../pages/charts'
 import Maps from '../../pages/google'
 import NotFound from '../../pages/notFound'
 import Icons from '../../pages/icons'
 import Typography from '../../pages/typography'
 import Tables from '../../pages/tables'
 import Notifications from '../../pages/notifications'
 import Posts from '../../pages/posts'
 import Profile from '../../pages/profile'
 import Privacy from '../../pages/privacy'
 import Volumes from '../../pages/volumes/Volumes';
 import Volume from '../../pages/volumes/volume';
 import Users from '../../pages/user/Users';
 import UserProfile from '../../pages/user/UserProfile';
 
 const NewLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
   
     return (
       <div className={s.root}>
         <Sidebar />
         <div
           className={cx(s.wrap, {[s.sidebarOpen]: sidebarOpen})}
         >
           <NewHeader
             sidebarToggle={() =>
                setSidebarOpen(!sidebarOpen)
             }
           />
           <main className={s.content}>
             <Switch>
               <Route path="/app/main" exact component={Dashboard} />
               <Route path="/app/user" exact component={Users} />
               <Route path="/app/users/add" exact component={UserProfile} />
               <Route path="/app/images" exact component={Images} />
               <Route path="/app/containers" exact component={Containers} />
               <Route path="/app/volumes" exact component={Volumes} />
               <Route path="/app/volumes/add" exact component={Volume} />
               <Route path="/app/typography" exact component={Typography} />
               <Route path="/app/tables" exact component={Tables} />
               <Route path="/app/posts" component={Posts} />
               <Route path="/app/privacy" exact component={Privacy} />
               <Route path="/app/profile" exact component={Profile} />
               <Route path="/app/notifications" exact component={Notifications} /> 
               <Route path="/app/components/buttons" exact component={Buttons} />
               <Route path="/app/components/charts" exact component={Charts} />
               <Route path="/app/components/icons" exact component={Icons} />
               <Route path="/app/components/maps" exact component={Maps} />
               <Route component={NotFound} />
             </Switch>
           </main>
           <Footer />
         </div>
       </div>
     );
   
 }
 
 export default NewLayout;
 
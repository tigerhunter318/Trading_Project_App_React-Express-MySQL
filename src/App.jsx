import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home/Home';
import SignUp from './SignUp/SignUp';
import EmailConfirmation from './Confirmation/EmailConfirmation';
import LogIn from './LogIn/LogIn';
import PassRecovery from './PassRecovery/PassRecovery';
import ChangePassword from './ChangePassword/ChangePassword';
import HomePage from './HomePage/HomePage';
import Deposit from './Components/Deposit/Deposit';
import Transaction from './Components/Transaction/Transaction';
import NotFound from './NotFound/NotFound';
import DataProvider from './context/DataContext';
import Withdraw from './Components/Withdraw/Withdraw';
import PaymentPreviewDeposit from './Components/PaymentPreview/PaymentPreviewDeposit';
import PaymentPreviewWihdraw from './Components/PaymentPreview/PaymentPreviewWihdraw';
import ControlBoard from './Dashboard/ControlBoard';



function App() {
  return (
    <Router>
      <DataProvider>
      <div className='App'>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/confirmation">
              <EmailConfirmation />
            </Route>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/recovery">
              <PassRecovery />
            </Route>
            <Route path="/changePassword">
              <ChangePassword />
            </Route>
            <Route path="/homepage">
              <HomePage />
            </Route>
            <Route path="/deposit">
              <Deposit />
            </Route>
            <Route path="/payment-preview-deposit">
              <PaymentPreviewDeposit />
            </Route>
            <Route path="/payment-preview-wihdraw">
              <PaymentPreviewWihdraw />
            </Route>
            <Route path="/transactions">
              <Transaction />
            </Route>
            <Route path="/withdraw">
              <Withdraw />
            </Route>
            <Route path="/dashboard">
              <ControlBoard />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
          
      </div>
      </DataProvider>
    </Router>
  );
}

export default App;

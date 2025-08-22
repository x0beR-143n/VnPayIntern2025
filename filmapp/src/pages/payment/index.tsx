import { View } from "@vnxjs/components"
//redux
import { Provider } from 'react-redux';
import { store } from '../../store/index';
//---------------
import PaymentHeader from "../../components/PaymentComponents/PaymentHeader/PaymentHeader"
import PaymentItems from "../../components/PaymentComponents/PaymentItems/PaymentItem"

function PaymentIndex() {
    return (
        <View>
            <PaymentHeader />
            <PaymentItems />
        </View>
    )
}

export default function Index() {
    return (
        <Provider store={store}>
            <PaymentIndex />
        </Provider>
    )
}
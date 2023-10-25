const { createContext, useState } = require("react")

export const DataContext = createContext()

const DataProvider = ({ children }) => {
    // Email Data
    const [email, setEmail] = useState("");

    // Pop-up Window Data - Modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [bank, setBank] = useState("");
    const [amount, setAmount] = useState("");

    // User Data
    const [firstName, setFirstName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [userId, setUserId] = useState("");

    // Phone Number Data
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid, setValid] = useState(undefined);
    const [acceptSend, setAcceptSend] = useState(false);

    const [toSwitch, setToSwitch] = useState(false);

    const [shouldReload, setShouldReload] = useState(false);


    const [checkbox1Checked, setCheckbox1Checked] = useState(false);
    const [checkbox2Checked, setCheckbox2Checked] = useState(false);
    const [checkbox3Checked, setCheckbox3Checked] = useState(false);
    const [checkbox4Checked, setCheckbox4Checked] = useState(false);


  return (
    <DataContext.Provider value={{ 
        email, setEmail,  
        isModalOpen, setModalOpen,  
        bank, setBank,  
        amount, setAmount,  
        firstName, setFirstName,
        fatherName, setFatherName,
        userId, setUserId,
        phoneNumber, setPhoneNumber, 
        valid, setValid, 
        acceptSend, setAcceptSend,
        toSwitch, setToSwitch,
        shouldReload, setShouldReload,
        checkbox1Checked, setCheckbox1Checked,
        checkbox2Checked, setCheckbox2Checked,
        checkbox3Checked, setCheckbox3Checked,
        checkbox4Checked, setCheckbox4Checked,
        }}>

        {children}

    </DataContext.Provider>
  )
}

export default DataProvider;
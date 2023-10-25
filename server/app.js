const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');

const app = express();

dotenv.config();
const PORT = 8000;

app.use(express.urlencoded({ extended:false }));
app.use(express.json());


// =========================================

const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  database.connect((err, resul)=>{
    if(err){
      throw err;
    }
      console.log(`Connected successfully to the database! ${resul}`);
  });

// =========================================

// إنشاء رمز تأكيد عشوائي من 4 أرقام
const generateVerificationCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// استخدام الدالة لإنشاء رمز تأكيد فريد من 4 أرقام
let verificationCode = generateVerificationCode();

// ========================================= 




// معالج تسجيل حساب جديد
app.post("/register", async (req, res)=>{
  try {
    const { firstName, fatherName, lastName, phoneNumber, email, password, confirmPassword } = req.body;
    const sqlFind = "SELECT Email FROM Users WHERE email = ?";
    database.query(sqlFind, [email], async (err, result) => {
      if (err) {
        console.log(err);
      } 
      
      if(result.length > 0) {
            return res.status(400).json({ message: "wrong email or password!" });
      } 
      else if(password !== confirmPassword) {
            return res.json({ message: "Passwords do not match" });
      }
  
      let passwordHash = await bcrypt.hash(password, 10);


  //     // إعداد نقل البريد الإلكتروني
  // const transporter = nodemailer.createTransport({
  //   service: 'smtp', 
  //   host: process.env.MAIL_HOST,
  //   port: process.env.MAIL_PORT,
  //     auth: {
  //       user: process.env.MAIL_USER,
  //       pass: process.env.MAIL_PASS
  //     }
  // });
  
  // // بيانات المستخدم
  // const user = {
  //   firstName: firstName,
  //   lastName: lastName,
  //   email: email // يجب استبداله ببريد المستخدم الفعلي
  // };
  
  // // إعداد رسالة البريد الإلكتروني
  // const mailOptions = {
  //   from: process.env.MAIL_FROM, 
  //   to: user.email, 
  //   subject: 'تأكيد التسجيل',
  //   text: ` مرحبًا بك في تطبيقنا، يرجى تأكيد البريد الإلكتروني. بارسال الرمز التالي ${verificationCode} `
  // };


  
      // إعداد نقل البريد الإلكتروني
      const transporter = nodemailer.createTransport({
        service: 'gmail',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
          }
      });
      
      // بيانات المستخدم
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email // يجب استبداله ببريد المستخدم الفعلي
      };
      
      // إعداد رسالة البريد الإلكتروني
      const mailOptions = {
        from: process.env.MAIL_USER, 
        to: user.email, 
        subject: 'تأكيد التسجيل',
        text: ` مرحبًا بك في تطبيقنا، يرجى تأكيد البريد الإلكتروني. بارسال الرمز التالي ${verificationCode} `
      };
      
  // إرسال البريد الإلكتروني
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
      setTimeout(() => {
        verificationCode = generateVerificationCode();
      }, 60 * 60 * 1000);

      const sqlQuery = "INSERT INTO Users (FirstName, FatherName, LastName, PhoneNumber, Email, Password) VALUES (?, ?, ?, ?, ?, ?)";
      database.query(sqlQuery, [firstName, fatherName, lastName, phoneNumber, email, passwordHash], (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error adding new user!");
          } else {
            console.log("New user added successfully!", result);
            res.status(201).send("New user added successfully!");
          }
        });
      }
    
    });
    
  });
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
});




// معالج تسجيل الدخول
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; 
  
    const findUser = "SELECT * FROM Users WHERE Email = ?";
    database.query(findUser, [email], async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      } else if (result.length > 0) {

        const UserID = result[0].UserID;
        const FirstName = result[0].FirstName;
        const FatherName = result[0].FatherName;
        const passwordMatch = await bcrypt.compare(password, result[0].Password);

        console.log(FirstName, FatherName);


        if (passwordMatch) {
          // res.status(200).send("Logged in successfully!");
          res.status(200).send({ userID: UserID, FirstName: FirstName, FatherName: FatherName });

        } else {
          res.status(400).send("Wrong email or password!");
        }
      } else {
        res.status(400).send("Wrong email or password!");
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});





// معالج لتأكيد الرمز المرسل للبريد الالكتروني عند تسجيل حساب
app.post("/confirmation", (req, res)=>{
  try {
  const { inputValues } = req.body;

  if (inputValues.length > 0 ) {

    const verificationCodeString = verificationCode.toString();
    const inputValuesString = inputValues.join('');

    const numbersMatch = verificationCodeString === inputValuesString;

    if (numbersMatch) {
      res.status(200).json({ message: "The number True" })
      console.log("The number True");
      verificationCode = generateVerificationCode();
    }else {
      res.status(400).json({ message: "The number False" })
      console.log("The number False");
    }

  } else console.log("Error!");

} catch (err) {
  res.status(500).send({ message: err.message })
}

});




// =========================================
const generateVerificationNum = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

let verificationNum = generateVerificationNum();
// console.log(verificationCode);
// =========================================


// معالج لتأكيد الرمز المرسل للبريد الالكتروني عند استعادة الحساب
app.post("/confirm", (req, res)=>{
  try {
  const { inputValues } = req.body;

  if (inputValues.length > 0 ) {

    const verificationCodeString = verificationNum.toString();
    const inputValuesString = inputValues.join('');

    const numbersMatch = verificationCodeString === inputValuesString;

    if (numbersMatch) {
      res.status(200).json({ message: "The number True" })
      console.log("The number True");
      verificationNum = generateVerificationNum();
    }else {
      res.status(400).json({ message: "The number False" })
      console.log("The number False");
    }

  } else console.log("Error!");

} catch (err) {
  res.status(500).send({ message: err.message })
}

});



// لاستعادة الحساب عبر البريد الالكتروني المرسل
app.post("/recovery", async (req, res) => {
  try {
    const { email } = req.body; 
  
    const findUser = "SELECT Email FROM Users WHERE email = ?";
    database.query(findUser, [email], async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });

      } else if (result.length > 0) {
        res.status(200).send({ message: "Email is Available!" });

          // إعداد نقل البريد الإلكتروني
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
  });
  
  const user = {
    email: email
  };
  
  const mailOptions = {
    from: process.env.MAIL_USER, 
    to: user.email, 
    subject: 'تأكيد ملكية البريد',
    text: ` :يرجى تأكيد ملكية البريد الإلكتروني. بارسال الرمز التالي لاسترجاع حسابك الخاص
      ${verificationNum} `
  };
  
  // إرسال البريد الإلكتروني
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
      setTimeout(() => {
        verificationNum = generateVerificationNum();
      }, 60 * 60 * 1000);
      }
    });

      } else {
        res.status(400).send("Wrong email or password!");
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});




// معالج لتغيير كلمة السر للمستخدم
app.post("/changePassword", async (req, res) => {
  try {
    const { email, changePassword } = req.body; 
  
    const findUser = "SELECT Email, Password FROM Users WHERE Email = ?";
    database.query(findUser, [email], async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      } else if (result.length > 0) {

        const hashedNewPassword = await bcrypt.hash(changePassword, 10);

        const updateUserQuery = "UPDATE Users SET Password = ? WHERE Email = ?";
        database.query(updateUserQuery, [hashedNewPassword, email], (updateErr) => {
          if (updateErr) {
            console.error(updateErr);
            res.status(500).send({ message: "Failed to update password" });
          } else {
            res.status(200).send("Password updated successfully!");
          }
        });

      } else {
        res.status(400).send("Wrong email or password!");
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});




// معالج تسجيل الدخول للمشرف
app.post("/admin-login", async (req, res) => {
  try {
    const { username, password } = req.body; 
  
    const find = "SELECT * FROM admin_login WHERE username = ?";
    database.query(find, [username], async (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
      } else if (result.length > 0) {

        const passwordMatch = await bcrypt.compare(password, result[0].password);

        if (passwordMatch) {
          res.status(200).send("Logged in successfully!");

        } else {
          res.status(400).send("Wrong username or password!");
        }
      } else {
        res.status(400).send("Wrong username or password!");
      }
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});


/* ============================================================= */




// معالج للإيداع
app.post('/deposit', async (req, res) => {
  const { amount, bank, userId } = req.body;
  const userID = parseInt(userId, 10);
  const amountNum = parseInt(amount, 10);

  // تنفيذ إدراج في جدول المعاملات للإيداع مع حالة "قيد التنفيذ"
  const insertDeposit = 'INSERT INTO Transactions (UserID, TransactionType, Amount, TransactionDate, PaymentMethod, Status) VALUES (?, "deposit", ?, NOW(), ?, "processing")';
  database.query(insertDeposit, [userID, amountNum, bank], async (err, depositResult) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred in the database' });
    } else {
      res.send('Deposit request submitted for review');
    }
  });
});




// معالج لرفض عمليات السحب والايداع من قبل المشرف
app.post('/transaction-rejected', async (req, res) => {
  const { transactionId, decision } = req.body;

  const transactionID = parseInt(transactionId, 10);

  const updateTransactionStatus = 'UPDATE Transactions SET Status = ? WHERE TransactionID = ?';
  database.query(updateTransactionStatus, [decision, transactionID], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred in the database' });
    } else {
      res.send('Transaction decision processed');
    }
  });
});




// معالج لقبول عمليات السحب و الايداع الخاصة بالمستثمر من قبل المشرف
app.post('/accept-withdrawal-deposit', async (req, res) => {
  const { transactionId, decision, transactionType } = req.body;

  const transactionID = parseInt(transactionId, 10);

  // تحديث الحالة في جدول المعاملات
  const updateTransactionStatus = 'UPDATE Transactions SET Status = ? WHERE TransactionID = ?';
  database.query(updateTransactionStatus, [decision, transactionID], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred in the database' });
    } else {
      if (transactionType === 'deposit') {

        const selectTransactionInfo = 'SELECT UserID, Amount FROM Transactions WHERE TransactionID = ?';
        database.query(selectTransactionInfo, [transactionID], (selectErr, selectResult) => {
          if (selectErr) {
            res.status(500).json({ error: 'An error occurred in fetching transaction info' });
          } else {
            const userID = parseInt(selectResult[0].UserID, 10);
            const amount = parseInt(selectResult[0].Amount, 10);

               const selectInvestor = 'SELECT TotalBalance FROM TotalBalances WHERE UserID = ?';
               database.query(selectInvestor, [userID], (selectInvestorErr, selectInvestorResult) => {
                 if (selectInvestorErr) {
                   res.status(500).json({ error: 'An error occurred in checking the investor' });
 
                 } else {
                   if (selectInvestorResult.length > 0) {
                     // إذا وُجِد المستثمر، قم بتحديث الرصيد الإجمالي
                     const currentBalance = parseInt(selectInvestorResult[0].TotalBalance, 10) || 0;
                     const newBalance =+ currentBalance + amount;
 
                     const updateTotalBalance = 'UPDATE TotalBalances SET TotalBalance = ? WHERE UserID = ?';
                     database.query(updateTotalBalance, [newBalance, userID], (updateErr, updateResult) => {
                       if (updateErr) {
                         res.status(500).json({ error: 'An error occurred in updating the total balance' });
                       } else {
                         res.send('Transaction decision processed');
                       }
                     });
 
 
                   } else {
                     // إذا لم يتم العثور على المستثمر، قم بإدراج سجل جديد بقيمة الرصيد المودع
                     const insertTotalBalance = 'INSERT INTO TotalBalances (TransactionID, UserID, TotalBalance, LastUpdatedDate) VALUES (?, ?, COALESCE(TotalBalance, 0) + ?, NOW()) ON DUPLICATE KEY UPDATE TotalBalance = COALESCE(TotalBalance, 0) + VALUES(TotalBalance)';
                     database.query(insertTotalBalance, [transactionID, userID, amount], (insertErr, insertResult) => {
                       if (insertErr) {
                         res.status(500).json({ error: 'An error occurred in inserting the total balance' });
                       } else {
                         res.send('Transaction decision processed');
                       }
                     });
 
                   }
                 }
               });
            

          }
        });

        
      } else { // transactionType === 'withdrawal'

        const selectTransactionInfo = 'SELECT UserID, Amount FROM Transactions WHERE TransactionID = ?';
        database.query(selectTransactionInfo, [transactionID], (selectErr, selectResult) => {
          if (selectErr) {
            res.status(500).json({ error: 'An error occurred in fetching transaction info' });
          } else {
            const userID = parseInt(selectResult[0].UserID, 10);
            const amount = parseInt(selectResult[0].Amount, 10);


               const selectInvestor = 'SELECT TotalBalance FROM TotalBalances WHERE UserID = ?';
               database.query(selectInvestor, [userID], (selectInvestorErr, selectInvestorResult) => {
                 if (selectInvestorErr) {
                   res.status(500).json({ error: 'An error occurred in checking the investor' });
 
                 } else {
                   if (selectInvestorResult.length > 0) {
                     // إذا وُجِد المستثمر، قم بتحديث الرصيد الإجمالي
                     const currentBalance = parseInt(selectInvestorResult[0].TotalBalance, 10) || 0;
                     const newBalance = currentBalance - amount;
 
                     const updateTotalBalance = 'UPDATE TotalBalances SET TotalBalance = ? WHERE UserID = ?';
                     database.query(updateTotalBalance, [newBalance, userID], (updateErr, updateResult) => {
                       if (updateErr) {
                         res.status(500).json({ error: 'An error occurred in updating the total balance' });
                       } else {
                         res.send('Transaction decision processed');
                       }
                     });
 
 
                   } else {
                         res.send('You have no balance to withdraw.');
                   }
                 }
               });
            

          }
        });


      }
    }
  });
});




// معالج للسحب
app.post('/withdraw', async (req, res) => {
  const { amount, bank, userId } = req.body;
  const userID = parseInt(userId, 10);
  const amountNum = parseInt(amount, 10);

  // جلب الرصيد الإجمالي للمستخدم
  const getTotalBalanceQuery = 'SELECT TotalBalance FROM TotalBalances WHERE UserID = ?';
  database.query(getTotalBalanceQuery, [userID], (err, balanceResult) => {
    if (err) {
      res.status(500).json({ error: 'An error occurred in the database' });
    } else {
      // التحقق من وجود السجل في جدول الرصيد الإجمالي
      if (balanceResult.length === 0) {
        res.status(400).send('The investor does not have a total balance record');

      } else {
        const totalBalance = balanceResult[0].TotalBalance;

        // التحقق من مبلغ السحب والرصيد الإجمالي
        if (amountNum > totalBalance) {
          res.status(400).send('The requested withdrawal amount is greater than the total balance');

        } else {

          // تنفيذ إدراج في جدول المعاملات للسحب مع حالة "قيد التنفيذ"
          const insertWithdrawal = 'INSERT INTO Transactions (UserID, TransactionType, Amount, TransactionDate, PaymentMethod, Status) VALUES (?, "withdrawal", ?, NOW(), ?, "processing")';
          database.query(insertWithdrawal, [userID, amountNum, bank], (err, withdrawalResult) => {
            if (err) {
              res.status(500).json({ error: 'An error occurred in the database' });
            } else {
              res.send('Withdrawal request submitted for review');
            }
          });

        }
      }
    }
  });
});



// معالج لحذف المعاملة التي هي قيد التنفيذ 
app.delete("/transaction/:id", async (req, res) => {
  const transactionID = req.params.id;

  const deleteTransaction = 'DELETE FROM Transactions WHERE TransactionID = ?';

  database.query(deleteTransaction, [transactionID], async (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred while deleting");
    } else {
      res.status(200).send("Deleted successfully");
    }
  });
});




// معالج لعرض معاملات المستخدم 
app.get('/transactions/:userId', async (req, res) => {
  const userId = req.params.userId; 

  const query = "SELECT TransactionID, TransactionType, Amount, TransactionDate, PaymentMethod, Status FROM Transactions WHERE UserID = ?";
  database.query(query, [userId], async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "A problem occurred in the database." });
    } else {
      res.json(result);
    }
  });
});




// معالج لقبول معاملة المستخدم من قبل المشرف
app.put('/transaction-accept/:transactionId', async (req, res) => {
  const transactionId = req.params.transactionId; 

  const getAmount = "SELECT UserID, Amount FROM Transactions WHERE TransactionID = ?";
  database.query(getAmount, [transactionId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred while deleting");
    } else {
      const amount = result[0].Amount;
      const userId = result[0].UserID;

         // تنفيذ الاستعلام للتحقق مما إذا كان لدي سجل في جدول الرصيد الإجمالي TotalBalances
         const findTotalBalance = 'SELECT TotalBalance FROM TotalBalances WHERE UserID = ?';
         database.query(findTotalBalance, [userId], async (err, balanceResult) => {
           if (err) {
             res.status(500).json({ error: 'An error occurred in the database' });
           } else {
             if (balanceResult.length === 0) {
               //اذا لم يكن لدي سجل في جدول الرصيد الإجمالي، لذلك قم بإدراج سجل جديد
               const insertTotalBalance = 'INSERT INTO TotalBalances (TransactionID, UserID, TotalBalance, LastUpdatedDate) VALUES (?, ?, ?, NOW())';
               database.query(insertTotalBalance, [transactionId, userId, amount], async (err, totalBalanceResult) => {
                 if (err) {
                   res.status(500).json({ error: 'An error occurred in the database' });
                 } else {
                   res.send('Deposit completed');
                 }
               });
             } else {
               // لدي سجل في جدول الرصيد الإجمالي، لذلك قم بتحديث الرصيد
               const updateTotalBalance = 'UPDATE TotalBalances SET TotalBalance = TotalBalance + ? WHERE UserID = ?';
               database.query(updateTotalBalance, [amount, userId], async (err, updateResult) => {
                 if (err) {
                   res.status(500).json({ error: 'An error occurred in the database' });
                 } else {
                  // تحديث حالة المعاملة لتصبح مقبولة 
                   const updateStatus = " UPDATE Transactions SET Status = 'Accepted' WHERE TransactionID = ?";
                   database.query(updateStatus, [transactionId], async (err, result) => {
                     if (err) {
                       console.log(err);
                       res.status(500).json({ error: "A problem occurred in the database." });
                     } else {
                      res.status(200).send('The admission process was successful');
                     }
                   });

                 }
               });
             }
           }
         });
    }
  });

});




// معالج لعرض الرصيد الاجمالي للمستخدم
app.get('/total/:userId', async (req, res) => {
  const userID = parseInt(req.params.userId, 10);

  const getTotalBalance = "SELECT TotalBalance FROM TotalBalances WHERE UserID = ?";
  database.query(getTotalBalance, [userID], async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "A problem occurred in the database." });
    } else {
      if (result[0] && result[0].TotalBalance) {
        const totalBalance = result[0].TotalBalance;
        res.status(200).json({ TotalBalance: totalBalance });
      } else {
        res.status(404).json({ error: "No total balance found for the specified user." });
      }
    }
  });
});



// معالج لعرض جميع معاملات المستخدمين للمشرف
app.get("/transactions", async (req, res) => {
  try {
  const getUsersNames = "SELECT UserID, FirstName, FatherName  FROM Users";
  database.query(getUsersNames, async (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "A problem occurred in the database." });
    } else {
      const usersNames = result;

      const queryTransactions = "SELECT * FROM Transactions";
      database.query(queryTransactions, async (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: "A problem occurred in the database." });
        } else {
          const transactionsUsers = result;
          res.status(200).json({usersNames, transactionsUsers});
        }
      });
    }
  });

} catch (err) {
  res.status(500).send({ message: err.message });
}
});





app.listen(PORT, ()=>{
    console.log(`Server has started on PORT ${PORT}...`);
  });
  

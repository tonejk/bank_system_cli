const readline = require("readline-sync");

// data
let all_users = [{
    name: 'john',
    password: 'john123',
    id: 1,
    balance: 1000,
    fund_requests: []
},
{
    name: 'jane',
    password: 'jane123',
    id: 2,
    balance: 2000,
    fund_requests: [{sender: 1, to: 2, amount: 500}]
}];

// help
const help = () => {

console.log(
"Here’s a list of commands you can use!\n\
help                Opens this dialog.\n\
quit                Quits the program.\n\
\n\
Account actions\n\
$ create_account      Opens a dialog for creating an account.\n\
$ close_account       Opens a dialog for closing an account.\n\
$ change_name         Opens a dialog for changing the name associated with an account.\n\
$ does_account_exist  Opens a dialog for checking if an account exists.\n\
$ account_balance     Opens a dialog for logging in and prints the account balance.\n\
$ \n\
$ Fund actions\n\
$ withdraw_funds      Opens a dialog for withdrawing funds.\n\
$ deposit_funds       Opens a dialog for depositing funds.\n\
$ transfer_funds      Opens a dialog for transferring funds to another account.\n\
$ \n\
$ Fund requests\n\
$ request_funds       Opens a dialog for requesting another user for funds.\n\
$ fund_requests       Shows all the fund requests for the given account.\n\
$ accept_fund_request Opens a dialog for accepting a fund request.\n\
\n\
\n\
");
}

// create_account
const createAccount = () => {
    let account_name, account_password, account_balance;
    console.log('Creating a new user account!');
    account_name = readline.question('Insert your name.' + '\n');
    console.log('Hello ' + account_name + '! It’s great to have you as a client.')
    while(true) {
        account_balance = readline.questionInt('How much is your initial deposit? (The minimum is 10)' + '\n');
        if(account_balance >= 10) {
            console.log('Great,' + account_name + '! You now have an account with a balance of' + account_balance);
            console.log('We’re happy to have you as a customer, and we want to ensure that your money is safe with us. ');
            account_password = readline.question('Give us a password, which gives only you the access to your account.'  + '\n');
            
            randomID = Math.floor(Math.random() * 9999) + 1000;
            let newAccount = {
                name: account_name,
                password: account_password,
                id: randomID,
                balance: account_balance,
                fund_requests: []
            };
            all_users.push(newAccount);
            
            console.log(all_users);
            console.log('Your account is now created.');
            console.log('Account id: ' + newAccount.id);
            console.log('Store your account ID in a safe place.');
            break;
        } else if (account_balance < 10) {
            console.log('Unfortunately we can’t open an account for such a small account. Do you have any more cash with you?' + '\n');
        }   
    }
}

// does_account_exist
const doesAccountExist = () => {
    console.log('Checking if an account exists!');
    let checkID = readline.questionInt('Enter the account ID whose existence you want to verify.' + '\n');
    for (let i=0; i < all_users.length; i++) {
        if(all_users[i].id === checkID) {
            console.log('This account exists.');
        } 
    }
    console.log('An account with that ID does not exist. Try again.');
}

// account_balance
const accountBalance = () => {
    console.log('Checking your account balance!');
    while(true) {
        let checkID = readline.questionInt('What is your account ID?' + '\n');
        let checkPWD = readline.question('Insert your password.' + '\n');

        let id = all_users.find(user => user.id === checkID);
        let password = all_users.find(user => user.password === checkPWD);

            if(id && password) {
                for (let i=0; i < all_users.length; i++) {
                    console.log('Correct password. We validated you as ' + all_users[i].name);
                    console.log('Your account balance is ' + all_users[i].balance);
                    break;
                }
            } else if (!id) {
                console.log('An account with that ID does not exist. Try again.');
            } else if (!password) {
                console.log('Wrong password, try typing it again.');
            }
        break;
    }
}

// change_name
const changeName = () => {
    console.log('Changing the name associated with your account!');
    while(true) {
        let checkID = readline.questionInt('What is your account ID?' + '\n');
        let checkPWD = readline.question('Insert your password.' + '\n');

        let id = all_users.find(user => user.id === checkID);
        let password = all_users.find(user => user.password === checkPWD);

            if(id && password) {
                for (let i=0; i < all_users.length; i++) {
                    console.log('Correct password. We validated you as ' + all_users[i].name);
                    console.log('But it appears you want to change your name.');
                    let newName = readline.question('Which name should we change your name to?' + '\n');
                    all_users[i].name = newName;
                    console.log('We will address you as ' + newName);
                    break;
                }
            } else if (!id) {
                console.log('An account with that ID does not exist. Try again.');
            } else if (!password) {
                console.log('Wrong password, try typing it again.');
            }
        break;
    }

}

// withdraw_funds
const withdrawFunds = () => {
    console.log('Withdrawing cash!');
    while(true) {
        let checkID = readline.questionInt('What is your account ID?' + '\n');
        let checkPWD = readline.question('Insert your password.' + '\n');

        let id = all_users.find(user => user.id === checkID);
        let password = all_users.find(user => user.password === checkPWD);

        if(id && password) {
            for (let i=0; i < all_users.length; i++) {
                console.log('Correct password. We validated you as ' + all_users[i].name);
                let withdraw = readline.questionInt('How much money do you want to withdraw?' + '(Current balance: ' + all_users[i].balance + ')' + '\n');
                
                if(all_users[i].balance > withdraw) {
                   console.log('Withdrawing a cash sum of ' + withdraw);
                   all_users[i].balance = all_users[i].balance - withdraw;
                   console.log('Your account balance is now ' + all_users[i].balance);
                   break;
                } else {
                    console.log('Unfortunately you don’t have the balance for that. Try a smaller amount.');
                }
            }

        } else if (!id) {
            console.log('An account with that ID does not exist. Try again.');
        } else if (!password) {
            console.log('Wrong password, try typing it again.');
        }
    break;
    }
}

// deposit_funds
const depositFunds = () => {
    console.log('Withdrawing cash!');
    while(true) {
        let checkID = readline.questionInt('What is your account ID?' + '\n');
        let checkPWD = readline.question('Insert your password.' + '\n');

        let id = all_users.find(user => user.id === checkID);
        let password = all_users.find(user => user.password === checkPWD);

            if(id && password) {
                for (let i=0; i < all_users.length; i++) {
                    console.log('Correct password. We validated you as ' + all_users[i].name);
                    let deposit = readline.questionInt('How much money do you want to deposit?' + '(Current balance: ' + all_users[i].balance + ')' + '\n');
                    
                    if(all_users[i].balance > deposit) {
                       console.log('Depositing ' + deposit);
                       newBalance = all_users[i].balance + deposit;
                       all_users[i].balance = newBalance;
                       console.log('Your account balance is now ' + newBalance);
                       break;
                    } 
                }

            } else if (!id) {
                console.log('An account with that ID does not exist. Try again.');
            } else if (!password) {
                console.log('Wrong password, try typing it again.');
            }
        break;
    }
}

// transfer_funds
const transferFunds = () => {
    console.log('Transferring funds!');
    while(true) {
        let checkID = readline.questionInt('What is your account ID?' + '\n');
        let checkPWD = readline.question('Insert your password.' + '\n');

        let id = all_users.find(user => user.id === checkID);
        let password = all_users.find(user => user.password === checkPWD);

            if(id && password) {

                for (let i=0; i < all_users.length; i++) {

                    console.log('Correct password. We validated you as ' + all_users[i].name);
                    let transfer = readline.questionInt('How much money do you want to transfer?' + '(Current balance: ' + all_users[i].balance + ')' + '\n');
                    let newBalance = all_users[i].balance - transfer;
                    all_users[i].balance = newBalance;
    
                    let checkID2 = readline.questionInt('Which account ID do you want to transfer these funds to?' + '\n');
        
                    objIndex = all_users.findIndex((obj => obj.id == checkID2));
    
                    all_users[objIndex].balance = all_users[objIndex].balance + transfer;
                    console.log('Sending ' + transfer + 'e' +' from account ID ' + checkID + ' to account ID ' + checkID2);
                  
                }

            } else if (!id) {
                console.log('An account with that ID does not exist. Try again.');
            } else if (!password) {
                console.log('Wrong password, try typing it again.');
            }
        break;
    }

}


// request_funds
const requestFunds = () => {
    console.log('Requesting funds!');
    while(true) {
        let checkID = readline.questionInt('What is your account ID?' + '\n');
        let checkPWD = readline.question('Insert your password.' + '\n');

        let id = all_users.find(user => user.id === checkID);
        let password = all_users.find(user => user.password === checkPWD);

            if(id && password) {

                for (let i=0; i < all_users.length; i++) {
                    console.log('Correct password. We validated you as ' + all_users[i].name);
                    let request = readline.questionInt('Account found. How much money do you want to request?' + '\n');
                    let targetID = readline.questionInt('Which account ID do you request funds from?' + '\n');
                    objIndex = all_users.findIndex((obj => obj.id == targetID));
                    let requestData = {
                        sender: checkID, 
                        to: targetID, 
                        amount: request,
                    };
                    all_users[objIndex].fund_requests.push(requestData);
                    console.log('Request Complete!');
                }

            } else if (!id) {
                console.log('An account with that ID does not exist. Try again.');
            } else if (!password) {
                console.log('Wrong password, try typing it again.');
            }
        break;
    }
}

// fund_requests
const fundRequests = () => {
    console.log('Requesting funds!');
    while(true) {
        let checkID = readline.questionInt('What is your account ID?' + '\n');
        let checkPWD = readline.question('Insert your password.' + '\n');

        let id = all_users.find(user => user.id === checkID);
        let password = all_users.find(user => user.password === checkPWD);

        if(id && password) {
            for (let i=0; i < all_users.length; i++) {

                if(all_users[i].id === checkID && all_users[i].password === checkPWD) {
                    console.log('Correct password. We validated you as ' + all_users[i].name);
                    console.log('Listing all the requests for your account!');
                    console.log(all_users[i].fund_requests);
                }  
            } 
        } else if (!id) {
            console.log('An account with that ID does not exist. Try again.');
        } else if (!password) {
            console.log('Wrong password, try typing it again.');
        }
        break;

    }
}

// accept_fund_request
const acceptFundRequest = () => {
    console.log('Accepting fund requests!');
    while(true) {
        let checkID = readline.questionInt('What is your account ID?' + '\n');
        let checkPWD = readline.question('Insert your password.' + '\n');

        let id = all_users.find(user => user.id === checkID);
        let password = all_users.find(user => user.password === checkPWD);
        
        if(id && password) {
        console.log('Correct password. We validated you as ' + id.name);
        console.log('Listing all the requests for your account!');
        
            for (let i = 0; i < id.fund_requests.length; i++) {
                
                let listRequests = id.fund_requests[i];
                console.log(listRequests);
                
                let balance = id.balance;
                console.log('Your account balance is ' + balance + ' e');
                
                let acceptRequest = readline.questionInt('Which fund request would you like to accept' + '\n');
                let targetID = id.fund_requests.find(user => user.sender === acceptRequest);
                
                if(targetID.amount > balance) {
                    console.log('You do not have funds to accept this request.');
                } else {
                    console.log('accepting fund request ' + targetID.amount + ' for the user ' + targetID.sender);
                    id.balance = balance - targetID.amount;
                    
                    let id2 = all_users.find(user2 => user2.id === targetID.sender);
                    id2.balance = id2.balance + targetID.amount;

                    console.log('Your account balance is now ' + id.balance);
                    console.log(all_users);
                }
            }
        } else if (!id) {
            console.log('An account with that ID does not exist. Try again.');
        } else if (!password) {
            console.log('Wrong password, try typing it again.');
        }
        break;
    }
}

// Main App
const app = () => {
    console.log('Welcome to Buutti banking CLI!');
    console.log('Hint: You can get help with the commands by typing "help".');
    while(true) {
        let command = readline.question('Give me an answer: ');
        switch(command){
            case 'help':
                help();
                break;
            case 'quit':
                console.log('Program closed. Bye!')
                return process.exit(1);
            case 'create_account':
                createAccount();
                break;
            case 'does_account_exist':
                doesAccountExist();
                break;
            case 'account_balance':
                accountBalance();
                break;
            case 'change_name':
                changeName();
                break;
            case 'withdraw_funds':
                withdrawFunds();
                break;
            case 'deposit_funds':
                depositFunds();
                break;
            case 'transfer_funds':
                transferFunds();
                break;
            case 'request_funds':
                requestFunds();
                break;
            case 'fund_requests':
                fundRequests();
                break;   
            case 'accept_fund_request':
                acceptFundRequest();
                break;        
            default:
                console.log('Invalid command.')
        }
    }
}

// Start program
app();
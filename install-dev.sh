#!/bin/bash


# Jagrik Development Server

echo -e "\n \t ============================ |- Welcome to Jagrik Development Server -| ========================== \n"
echo -e "\t Kindly choose the package manager below to start installing the app locally(type the option number)..."
echo "  1) npm"
echo "  2) yarn"

read n

case $n in
  1) echo "You have selected npm as your package manager";;
  2) echo "You have selected yarn as your package manager";;
  *) echo "Default option 'npm' is selected";;
esac

# Package Manager Variable
packageManager="npm"

# Checking if Selected package manager is npm
if [ "$n" == 1 ]

then
    packageManager="npm"

# Else package manager is yarn
else
    packageManager="yarn"

fi

    # Installing pm2 globally
    if [ "$packageManager" == "npm" ]

    then    
        sudo $packageManager -g install pm2

    else
        sudo $packageManager global add pm2

    fi

    # Assign Current workdir
    mainDir=$PWD
    
    # Go to services directory
    cd services

    # Define the service Directory array
    serviceArray=( 'server' 'client')

    # Loop through all the directories and install the packages 
    for i in "${serviceArray[@]}"
    do

        # Go to service directory
        cd $i

        service="$(cut -d'/' -f1 <<<"$i")"

        # Echo the Status
        echo -e "\n \t Installing $service ..."

        # Create Uploads Folder
        mkdir uploads

        # Start the process and push it to background
        $packageManager install &

        # Wait for process to get completed
        wait

        # Echo the status
        echo -e "\n \t $service has installed successfully!"  

        # Go back to main working directory(i.e. - services/)
        cd -
    done

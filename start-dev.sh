#!/bin/bash

# Jagrik development server

echo -e "\n \t ============================ |- Welcome to Jagrik Development Server -| ========================== \n"
echo -e "\t Kindly choose the package manager below to start the application locally(type the option number)..."
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
    # Assign Current workdir
    mainDir=$PWD

    # Define the service Directory array
    serviceArray=( 'server' )

    # Loop through all the directories and install the packages 
    for i in "${serviceArray[@]}"
    do
        # Slice the name of service from the entire directory name
        service="$(cut -d'/' -f1 <<<"$i")"

        # Go to service directory
        cd $i

        # Echo the Status
        echo -e "\n \t Starting $service ..."

        # Start the process and push it to background
        pm2 start "$packageManager run dev" --name "$service"

        # Wait for process to get completed
        wait

        # Echo the status
        echo -e "\n \t $service has been started successfully!"  

        cd -
    done
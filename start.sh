#!/bin/bash

FOLDER_PATH=$HOME/UniQuizzesFinal

build() {
    # common part
    cp -r $FOLDER_PATH/UniQuizzes/* $FOLDER_PATH
    cp -r $FOLDER_PATH/JSQuizee/index.html $FOLDER_PATH
    cp -r $FOLDER_PATH/JSQuizee/js/main.js $FOLDER_PATH/js
    
    touch $FOLDER_PATH/.gitignore
    echo "*" > .gitignore 
     
    touch $FOLDER_PATH/DO_NOT_EDIT_OR_MODIFY_THIS_FOLDER
    
    echo "---"
    echo "Cartella creata con successo: $FOLDER_PATH"
    echo "Apri li un server e potrai avere accesso alle tue domande cliccando $FOLDER_PATH/index.html"
    echo "Tutti i cambiamenti, ricordati di eseguirli in $PWD, NON in $FOLDER_PATH"

    exit
}

pre_script() {
    if [ -d "$FOLDER_PATH" ]; then
        # Take action if $DIR exists. #
        rm -rf $FOLDER_PATH
    fi
}

from_local() {
    # LOCAL
    mkdir $FOLDER_PATH

    # clone jsquizee, base engine
    git clone https://github.com/dag7dev/JSQuizee $FOLDER_PATH/JSQuizee

    # this local folder
    mkdir $FOLDER_PATH/UniQuizzes
    cp -r . $FOLDER_PATH/UniQuizzes

    build
}

from_online() {
    mkdir $FOLDER_PATH
    git clone https://github.com/dag7dev/JSQuizee $FOLDER_PATH/JSQuizee
    git clone https://github.com/dag7dev/UniQuizzes $FOLDER_PATH/UniQuizzes

    build
}


show_help() {
    echo -e "Usage: ./start.sh [OPTION]"
    echo -e "Costruisce il progetto UniQuizzes a partire da alcuni file potendo scegliere se importarli dai file già online o dal tuo computer"
    echo -e ""
    echo -e "Percorso della cartella UniQuizzesFinal: $FOLDER_PATH"
    echo -e ""
    echo -e "Opzioni:"
    echo -e "  --from-local, --local\t\tCostruisce UniQuizzes a partire da file locali"
    echo -e "  --from-online, --online\tCostruisce UniQuizzes a partire da file nella repository UniQuizzes su Github"
    echo -e "  --help\t\t\tVisualizza questo messaggio"
}

#################
# MAIN

for arg in "$@"; do
  shift
  case "$arg" in
    '--from-local' | '--local')
        pre_script
        from_local
        ;;

    '--from-online' | '--online')
        pre_script
        from_online
        ;;

    '--help')
        show_help
        exit
        ;;
    esac
  break
done

show_help


const config = {
    PROJECT_NAME: 'new-cli',
    DEFAULT_FOLDER_NAME: 'digital_authoring',
    APP1:'APP1',
    DEFAULT_JSON_FILE: 'user.json',
    DELETE_FILE: 'user.json',
    FILE_NAME_WHERE_STRING_TO_BE_REPLACED:{
        name: 'string.txt',
        string_to_be_replaced: {
            "Helo": "Hello",
            "worLd": "world",
            "glads": "glad",
            "alife": "alive",
            "Im": "I'm"
        }
    },
    DEPENDENCIES: {
        "filePath": "user.json",
        "keyToBeUpdated": "dependencies",
        "toBeAdded": [
            {
                "package-name" : "barfi",
                "version-name": "2.3.1"
            },
            {
                "package-name" : "vikash",
                "version-name": "1.3.1"
            }
        ]
    },
    PACKAGE: {
        "filePath": "package.json",
        "keyToBeUpdated": "files",
        "itemsToBeAdded": [
            "item1",
            "item2",
            "item5"
        ],
        "itemsToBeRemoved": [
            "item1",
            "item2",
            "item3"
        ]
    }
}
// /.local/share/vip/dev-environment/rahul
export default config
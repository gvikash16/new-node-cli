const config = {
    projectName: 'new-cli',
    projectPath: process.cwd(),
    projectConfigFileName: 'config.json',
    defaultFolderName: 'digital_authoring',
    app1:'APP1',
    defaultJsonFile: 'user.json',
    deleteFile: 'user.json',
    fileNameWhereStringToBeReplaced:{
        name: 'string.txt',
        stringToBeReplaced: {
            "Helo": "Hello",
            "worLd": "world",
            "glads": "glad",
            "alife": "alive",
            "Im": "I'm"
        }
    },
    dependencies: {
        filePath: "user.json",
        keyToBeUpdated: "dependencies",
        toBeAdded: [
            {
                packageName : "barfi",
                versionName: "2.3.1"
            },
            {
                packageName : "vikash",
                versionName: "1.3.1"
            }
        ]
    },
    package: {
        filePath: "package.json",
        keyToBeUpdated: "files",
        itemsToBeAdded: [
            "item1",
            "item2",
            "item5"
        ],
        itemsToBeRemoved: [
            "item1",
            "item2",
            "item3"
        ]
    },
    vip_path:'/.local/share/vip/dev-environment'
}
export default config
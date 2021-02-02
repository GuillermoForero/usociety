export class CreatePostContent {
    //TEXT("TEXT", 0),    IMAGE("IMAGE", 1),    SURVEY("SURVEY", 2);
    type;
    value;
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

export class CreatePost {
    createPostContent;
    groupId;
    description;
    isPublic;

    constructor(createPostContent, groupId, description, isPublic) {
        this.createPostContent = createPostContent;
        this.groupId = groupId;
        this.description = description;
        this.isPublic = isPublic;
    }
}

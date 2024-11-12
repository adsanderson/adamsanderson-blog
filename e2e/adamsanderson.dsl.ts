export interface AdamSandersonCoUk {
    goto: () => Promise<void>;
    expectToSeePosts: () => Promise<void>;
    viewPost: (postTitle: string) => Promise<void>;
    expectToSeePost: (postTitle: string) => Promise<void>;
}
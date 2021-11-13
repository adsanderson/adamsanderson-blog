/**
 * @param {"published" | "unpublished" | "all" | string} filterState
 * @param {{[key: string]: any}[]} blogs
 * @returns 
 */
export function processBlogList(filterState, blogs) {
    blogs = blogs.filter(toFilterState(filterState));
    return blogs.sort((a, b) => {
        if (a.publishDate < b.publishDate) {
            return 1;
        }
        if (a.publishDate > b.publishDate) {
            return -1;
        }
        return 0;
    })
}

function toFilterState(filterState) {
    if (filterState === "published") {
        return post => post.publishDate;
    }
    if (filterState === "unpublished") {
        return post => !post.publishDate;
    }
    if (filterState === "all") {
        return () => true;
    }
    return post => post.publishDate;
}
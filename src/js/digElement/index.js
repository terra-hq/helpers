import JSUTIL from "@andresclua/jsutil";

const digElement = async (payload) => {
    if (!payload.element) return Promise.resolve(false);

    return new Promise((resolve) => {
        if (payload.search?.type == "style") {
            resolve(payload.search.lookFor.some((property) => payload.element.style[property]));
        } else if (payload.search?.type == "class") {
            resolve(new JSUTIL().matches(payload.element, payload.search.lookFor, payload.search.attribute || payload.search.type));
        } else if (payload.search?.type == "hasChildren") {
            resolve(payload.element.children.length > 0);
        }
    });
};

export { digElement };

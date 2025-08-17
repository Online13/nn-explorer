
export interface ElementItem {
    id: string;
    title: string;
    subtitle: string;
    tags: string[];
}

export interface ElementData {
    key: string;
    title: string;
    items: ElementItem[];
}
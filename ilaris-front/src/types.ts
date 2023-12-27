export enum Weather {
    Rainy = "rainy",
    Sunny = "sunny",
    Windy = "windy",
    Cloudy = "cloudy",
    Stormy = "stormy",
}

export enum Visibility {
    Great = "great",
    Good = "good",
    Ok = "ok",
    Poor = "poor",
}

export interface Diary {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
}

export interface NewDiaryEntry {
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}
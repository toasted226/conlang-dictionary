export interface Word {
    word_id: number,
    language_id: number,
    word: string,
    phonetic_transcription: string,
    translation: string,
    part_of_speech: string,
    example: string,
    example_translation: string,
}

export interface WordData {
    word: string,
    phonetic_transcription: string,
    translation: string,
    part_of_speech: string,
    example: string,
    example_translation: string,
}

import { builder } from '@builder.io/sdk';

// Initialize Builder with your API key
// Get your API key from https://builder.io/account/settings
const BUILDER_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY || '';

if (BUILDER_API_KEY) {
    builder.init(BUILDER_API_KEY);
}

export { builder };

// Content model names used in Builder.io
export const BUILDER_MODELS = {
    LESSON: 'lesson-content',
    PAGE: 'page',
    ANNOUNCEMENT: 'announcement',
} as const;

// Fetch lesson content from Builder
export async function getLessonContent(lessonSlug: string) {
    if (!BUILDER_API_KEY) {
        return null;
    }

    try {
        const content = await builder
            .get(BUILDER_MODELS.LESSON, {
                query: {
                    'data.slug': lessonSlug,
                },
            })
            .toPromise();

        return content;
    } catch (error) {
        console.error('Error fetching Builder content:', error);
        return null;
    }
}

// Fetch page content from Builder
export async function getPageContent(urlPath: string) {
    if (!BUILDER_API_KEY) {
        return null;
    }

    try {
        const content = await builder
            .get(BUILDER_MODELS.PAGE, {
                url: urlPath,
            })
            .toPromise();

        return content;
    } catch (error) {
        console.error('Error fetching Builder page:', error);
        return null;
    }
}

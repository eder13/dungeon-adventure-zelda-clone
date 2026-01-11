export class TimeParser {
    static parseTimeToMs(input: string): number {
        if (!input) return Infinity;
        // split on anything non-digit (.:, space, etc.)
        const parts = input
            .split(/[^\d]+/)
            .map((p) => p.trim())
            .filter(Boolean);
        if (parts.length === 0) return Infinity;

        // convert strings to numbers
        const nums = parts.map((p) => Number(p));
        // helper: normalize millisecond-part length to 3 digits
        const normalizeMs = (msPart: number, raw: string) => {
            const len = raw.length;
            if (len === 3) return msPart;
            if (len === 2) return msPart * 10; // "23" -> 230 ms
            if (len === 1) return msPart * 100; // "2" -> 200 ms
            return msPart; // fallback
        };

        let minutes = 0,
            seconds = 0,
            milliseconds = 0;
        if (nums.length >= 3) {
            // assume minutes.seconds.milliseconds  (e.g. "2.23.234")
            minutes = nums[0];
            seconds = nums[1];
            milliseconds = normalizeMs(nums[2], parts[2]);
        } else if (nums.length === 2) {
            // assume seconds.milliseconds (e.g. "23.234")
            seconds = nums[0];
            milliseconds = normalizeMs(nums[1], parts[1]);
        } else {
            // single number -> assume seconds (or milliseconds if < 1 but we treat as seconds)
            seconds = nums[0];
        }

        return minutes * 60_000 + seconds * 1_000 + milliseconds;
    }
}

import { type Page } from '@playwright/test';

type Promisify<T> = {
	[K in keyof T]: T[K] extends (...args: infer A) => infer R
	? (...args: A) => Promise<R>
	: Promise<T[K]>;
};

export class PagePerformance implements Promisify<Omit<Performance,
	| 'navigation'
	| 'timing'
>> {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	get timeOrigin(): Promise<number> {
		return this.page.evaluate(() => performance.timeOrigin);
	}

	get onresourcetimingbufferfull(): Promise<((this: Performance, ev: Event) => any) | null> {
		return this.page.evaluate(() => performance.onresourcetimingbufferfull);
	}

	get eventCounts(): Promise<EventCounts> {
		return this.page.evaluate(() => performance.eventCounts);
	}

	clearMarks(markName?: string | undefined): Promise<void> {
		return this.page.evaluate(
			({ markName }) => {
				performance.clearMarks(markName);
			},
			{ markName }
		);
	}

	clearMeasures(measureName?: string | undefined): Promise<void> {
		return this.page.evaluate(
			({ measureName }) => {
				return performance.clearMeasures(measureName);
			},
			{ measureName }
		);
	}

	clearResourceTimings(): Promise<void> {
		return this.page.evaluate(() => {
			return performance.clearResourceTimings();
		});
	}
	getEntries(): Promise<PerformanceEntryList> {
		return this.page.evaluate(() => {
			return performance.getEntries();
		});
	}
	getEntriesByName(name: string, type?: string | undefined): Promise<PerformanceEntryList> {
		return this.page.evaluate(({ name, type }) => {
			return performance.getEntriesByName(name, type);
		}, { name, type });
	}
	getEntriesByType(type: string): Promise<PerformanceEntryList> {
		return this.page.evaluate(({ type }) => {
			return performance.getEntriesByType(type);
		}, { type });
	}
	mark(markName: string, markOptions?: PerformanceMarkOptions | undefined): Promise<PerformanceMark> {
		return this.page.evaluate(({ markName, markOptions }) => {
			return performance.mark(markName, markOptions);
		}, { markName, markOptions });
	}
	measure(
		measureName: string,
		startOrMeasureOptions?: string | PerformanceMeasureOptions | undefined,
		endMark?: string | undefined
	): Promise<PerformanceMeasure> {
		return this.page.evaluate(({ measureName, startOrMeasureOptions, endMark }) => {
			return performance.measure(measureName, startOrMeasureOptions, endMark);
		}, { measureName, startOrMeasureOptions, endMark });
	}
	now(): Promise<number> {
		return this.page.evaluate(() => {
			return performance.now();
		});
	}
	setResourceTimingBufferSize(maxSize: number): Promise<void> {
		return this.page.evaluate(({ maxSize }) => {
			return performance.setResourceTimingBufferSize(maxSize);
		}, { maxSize });
	}
	toJSON(): Promise<any> {
		return this.page.evaluate(() => {
			return performance.toJSON();
		});
	}
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions | undefined
	): Promise<void>;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions
	): Promise<void> {
		return this.page.evaluate(({ type, listener, options }) => {
			return performance.addEventListener(type, listener, options);
		}, { type, listener, options });
	}
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions | undefined
	): Promise<void>;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions
	): Promise<void> {
		return this.page.evaluate(({ type, listener, options }) => {
			return performance.removeEventListener(type, listener, options);
		}, { type, listener, options });
	}
	dispatchEvent(event: Event): Promise<boolean> {
		return this.page.evaluate(({ event }) => {
			return performance.dispatchEvent(event);
		}, { event });
	}
}

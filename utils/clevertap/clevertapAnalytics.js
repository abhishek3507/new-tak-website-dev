export const WindowWithAnalytics = Window &
	typeof globalThis & {	
		clevertap	// write more types here if you want
};

let clevertapAnalytics = {
    isWindowRuntime: typeof window !== 'undefined',
	pushEvent : (eventName,payload)=>{
	    (WindowWithAnalytics).clevertap.event.push(eventName, payload)
    }
}

export default clevertapAnalytics;

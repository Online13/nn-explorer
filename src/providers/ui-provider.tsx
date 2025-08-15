"use client";
import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

interface UIDetails {
    [key: string]: unknown;
}

interface UIState {
	details: UIDetails | null;
	showElementPanel: boolean;
}

interface UIContextState extends UIState {
	set: <K extends keyof UIState>(key: K, value: UIState[K]) => void;
}

const UIContext = createContext<UIContextState | undefined>(undefined);

export function UIProvider({ children }: PropsWithChildren) {
	const [state, setState] = useState<UIState>({
		details: null,
		showElementPanel: true,
	});
	const set = useCallback(
		<K extends keyof UIState>(key: K, value: UIState[K]) => {
			setState((prev) => ({ ...prev, [key]: value }));
		},
		[]
	);
	const store = useMemo(() => ({ ...state, set }), [state, set]);

	return <UIContext.Provider value={store}>{children}</UIContext.Provider>;
}

export function useUI() {
	const context = useContext(UIContext);
	if (!context) {
		throw new Error("useUI must be used within a UIProvider");
	}
	return context;
}
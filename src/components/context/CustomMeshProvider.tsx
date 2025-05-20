"use client"; // This is crucial

import { ReactNode } from "react";
import { MeshProvider } from "@meshsdk/react";

export default function ClientMeshProvider({
	children,
}: {
	children: ReactNode;
}) {
	return <MeshProvider>{children}</MeshProvider>;
}

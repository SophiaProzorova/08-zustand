'use client'

import { useRouter } from "next/navigation";
import ModalBasic from "@/components/Modal/Modal";

type Props = {
    children: React.ReactNode;
};

const Modal = ({ children }: Props) => {
    const router = useRouter();

    return (
        <ModalBasic onClose={() => router.back()}>
            {children}
        </ModalBasic>
    );
};

export default Modal;
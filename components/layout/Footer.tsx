import Container from "@/components/layout/Container";

export default function Footer() {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-800">
            <Container>
                <div className="py-10 text-sm text-neutral-500">
                    <p>Darshit Lagdhir — Systems-Focused Developer</p>
                    <p className="mt-2">© {new Date().getFullYear()}</p>
                </div>
            </Container>
        </footer>
    );
}

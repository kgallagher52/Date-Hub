type Profile = {
    image: {
        src: string;
        alt: string;
    };
    name: string;
};

type NavBarProps = {
    profile?: Profile;
    toggleModal: (string) => void;
};

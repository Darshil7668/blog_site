export const fadeLeft = {
    initial: {
        opacity: 0,
        x: -100
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 200,
        }
    }
}
export const fadeRight = {
    initial: {
        opacity: 0,
        x: 100
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
        }
    }
}

export const fadeTop = {
    initial: {
        opacity: 0,
        y: -100
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

export const stagger = {
    initial: {
    },
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const fadeScale = {
    initial: {
        scale: 1.3
    }, animate: {
        scale: 1,
        transition: {
            duration: 0.7
        }
    }
}
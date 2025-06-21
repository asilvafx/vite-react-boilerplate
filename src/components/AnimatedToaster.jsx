import { Toaster, ToastBar } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

const AnimatedToaster = () => {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 4000,
            }}
        >
            {(t) => (
                <AnimatePresence>
                    {t.visible && (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ToastBar toast={t} />
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </Toaster>
    );
};

export default AnimatedToaster;

"use client";

import { Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <Modal show={isModalOpen} onClose={handleClose} className="overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Modal.Header>
              <div className="text-center w-full">
                <h3 className="text-xl font-medium text-gray-900">Terima Kasih!</h3>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <motion.div 
                  className="mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <svg 
                    className="w-16 h-16 text-green-500 mx-auto"
                    fill="none"
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    />
                  </svg>
                </motion.div>
                <motion.p 
                  className="text-gray-600"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  File Anda telah berhasil diunduh. Terima kasih telah menggunakan layanan kami!
                </motion.p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <motion.button
                onClick={handleClose}
                className="w-full px-4 py-2 text-white bg-purple-500 rounded-lg hover:bg-purple-600 focus:outline-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Tutup
              </motion.button>
            </Modal.Footer>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

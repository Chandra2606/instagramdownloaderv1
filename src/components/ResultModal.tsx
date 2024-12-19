"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

interface MediaItem {
  url: string;
  type: string;
  thumbnail: string;
}

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    data: MediaItem[];
  };
}

export default function ResultModal({
  isOpen,
  onClose,
  data,
}: ResultModalProps) {
  const [downloading, setDownloading] = useState<number | null>(null);

  const handleDownload = async (url: string, type: string, index: number) => {
    try {
      setDownloading(index);

      const response = await fetch("/api/proxy-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `instagram-${Date.now()}.${
        type === "video" ? "mp4" : "jpg"
      }`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download error:", error);
      alert("Gagal mengunduh media. Silakan coba lagi.");
    } finally {
      setDownloading(null);
    }
  };

  console.log("Modal Data:", data);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Media yang Tersedia
                </Dialog.Title>

                <div className="mt-2">
                  {data?.data?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.data.map((item, index) => (
                        <div
                          key={index}
                          className="border rounded-lg overflow-hidden shadow-sm"
                        >
                          <div className="relative pt-[56.25%] bg-gray-100">
                            {item.type === "video" ? (
                              <video
                                key={item.url}
                                src={item.url}
                                controls
                                className="absolute top-0 left-0 w-full h-full object-contain"
                                poster={item.thumbnail}
                                onError={(e) => {
                                  console.error("Video error:", e);
                                  const target = e.target as HTMLVideoElement;
                                  target.style.display = "none";
                                }}
                              />
                            ) : (
                              <img
                                key={item.url}
                                src={item.url}
                                alt={`Media ${index + 1}`}
                                className="absolute top-0 left-0 w-full h-full object-contain"
                                onError={(e) => {
                                  console.error("Image error:", e);
                                  const target = e.target as HTMLImageElement;
                                  target.src = item.thumbnail;
                                }}
                                loading="lazy"
                              />
                            )}
                          </div>

                          <div className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">
                                {item.type === "video" ? "Video" : "Image"}{" "}
                                {index + 1}
                              </span>
                              <button
                                onClick={() =>
                                  handleDownload(item.url, item.type, index)
                                }
                                disabled={downloading === index}
                                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white ${
                                  downloading === index
                                    ? "bg-purple-400 cursor-not-allowed"
                                    : "bg-purple-600 hover:bg-purple-700"
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                              >
                                {downloading === index ? (
                                  <>
                                    <svg
                                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      />
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      />
                                    </svg>
                                    Mengunduh...
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      className="w-4 h-4 mr-2"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                      />
                                    </svg>
                                    Download
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">
                      Tidak ada media yang tersedia
                    </p>
                  )}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={onClose}
                  >
                    Tutup
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

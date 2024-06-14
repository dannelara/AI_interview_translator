"use client";

import React, { useEffect, useState, useRef } from "react";

type MediaRecorderType = MediaRecorder | null;

export const useRecordVoice = () => {
  const [mediaRecorder, setMediaRecorder] =
    React.useState<MediaRecorderType>(null);
  const [recording, setRecording] = React.useState<boolean>(false);
  const [recordedAudio, setRecordedAudio] = React.useState<Blob | null>(null);
  const chunks = React.useRef<Blob[]>([]);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
      chunks.current = [];
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const resetRecording = () => {
    setRecordedAudio(null);
  };

  const initialMediaRecorder = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      chunks.current = [];
    };

    mediaRecorder.ondataavailable = (ev: BlobEvent) => {
      chunks.current.push(ev.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks.current, { type: "audio/wav" });
      setRecordedAudio(audioBlob);
      chunks.current = [];
    };

    setMediaRecorder(mediaRecorder);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder)
        .catch((error) => {
          console.error("Error accessing audio devices.", error);
        });
    }
  }, []);

  return {
    recording,
    startRecording,
    stopRecording,
    recordedAudio,
    resetRecording,
  };
};

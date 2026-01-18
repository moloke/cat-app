import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { FaCloudUploadAlt, FaImage } from 'react-icons/fa'
import { uploadImage } from '../services/catApi'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [validationError, setValidationError] = useState<string>('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const uploadMutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      toast.success('Cat uploaded successfully! 🎉')
      queryClient.invalidateQueries({ queryKey: ['images'] })
      setTimeout(() => {
        navigate('/')
      }, 1000)
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || 'Failed to upload image. Please try again.'
      toast.error(message)
    },
  })

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Please select a valid image file (JPEG, PNG, GIF, or WebP)'
    }

    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 5MB'
    }

    return null
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setValidationError('')

    if (!file) {
      setSelectedFile(null)
      setPreviewUrl('')
      return
    }

    const error = validateFile(file)
    if (error) {
      setValidationError(error)
      setSelectedFile(null)
      setPreviewUrl('')
      return
    }

    setSelectedFile(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      setValidationError('Please select an image to upload')
      return
    }

    uploadMutation.mutate(selectedFile)
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setValidationError('')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Cat Image</h1>
      <p className="text-gray-600 mb-8">
        Share your favorite cat photo with the world
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              previewUrl
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            {previewUrl ? (
              <div className="relative w-full h-full p-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-contain rounded"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FaCloudUploadAlt className="w-16 h-16 text-gray-400 mb-4" />
                <p className="mb-2 text-sm text-gray-700">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  JPEG, PNG, GIF, or WebP (max 5MB)
                </p>
              </div>
            )}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadMutation.isPending}
            />
          </label>
        </div>

        {selectedFile && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaImage className="text-blue-600 text-xl" />
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClearFile}
              className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer"
              disabled={uploadMutation.isPending}
            >
              Remove
            </button>
          </div>
        )}

        {validationError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{validationError}</p>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={!selectedFile || uploadMutation.isPending}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
              !selectedFile || uploadMutation.isPending
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            }`}
          >
            {uploadMutation.isPending ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </span>
            ) : (
              'Upload Image'
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            disabled={uploadMutation.isPending}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Upload Tips</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="mr-2">🎨</span>
            <span>Supported formats: JPEG, PNG, GIF, WebP</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">📏</span>
            <span>Maximum file size: 5MB</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Upload
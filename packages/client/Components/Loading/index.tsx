const Loading = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-blue-500"></div>
                <span className="text-gray-700">Loading...</span>
            </div>
        </div>
    )
}

export default Loading;
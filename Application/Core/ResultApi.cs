namespace Application.Core
{
    public class ResultApi<T>
    {
        public bool IsSuccess { get; set; }

        public T Value { get; set; }

        public string Error { get; set; }

        public static ResultApi<T> Success(T value) => new ResultApi<T> { IsSuccess = true, Value = value };

        public static ResultApi<T> Failure(string error) => new ResultApi<T> { IsSuccess = false, Error = error };
    }
}

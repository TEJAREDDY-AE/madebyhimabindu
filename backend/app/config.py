"""Application configuration via pydantic-settings.

Loads runtime configuration from environment variables (and optionally a
`.env` file at the backend root). The backend is designed to fail fast at
startup when required secrets such as ``GROQ_API_KEY`` are absent: because
:attr:`Settings.groq_api_key` has no default, instantiating :class:`Settings`
without the variable set raises a :class:`pydantic.ValidationError`, which
propagates as a startup error.
"""

from __future__ import annotations

from functools import lru_cache
from typing import List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Backend runtime configuration.

    Attributes:
        groq_api_key: Groq API key. Required; no default. The application
            will fail to start when this is unset.
        groq_model: Chat model identifier passed to ChatGroq.
        cors_origins: Allowed origins for the FastAPI CORS middleware.
            Accepts a JSON list or a comma-separated string in the
            environment (e.g. ``"http://localhost:5173,http://127.0.0.1:5173"``).
    """

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    groq_api_key: str = Field(..., description="Groq API key (required at startup).")
    groq_model: str = Field(default="llama3-70b-8192")
    cors_origins: List[str] = Field(
        default_factory=lambda: ["http://localhost:5173"],
    )

    @field_validator("cors_origins", mode="before")
    @classmethod
    def _split_cors_origins(cls, value: object) -> object:
        """Allow ``CORS_ORIGINS`` to be provided as a comma-separated string."""
        if isinstance(value, str):
            stripped = value.strip()
            if not stripped:
                return []
            # Treat as JSON list when it looks like one; otherwise comma-split.
            if stripped.startswith("["):
                return value
            return [origin.strip() for origin in stripped.split(",") if origin.strip()]
        return value


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    """Return a process-wide cached :class:`Settings` instance.

    Raises:
        pydantic.ValidationError: If ``GROQ_API_KEY`` is not set in the
            environment or ``.env`` file. This is the fail-fast startup
            error that prevents the backend from running without a key.
    """
    return Settings()  # type: ignore[call-arg]

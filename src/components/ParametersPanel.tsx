'use client'

import { Slider } from './Slider'

interface Parameters {
  temperature: number
  maxTokens: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
}

interface ParametersPanelProps {
  parameters: Parameters
  onParametersChange: (parameters: Parameters) => void
}

export function ParametersPanel({ parameters, onParametersChange }: ParametersPanelProps) {
  const updateParameter = (key: keyof Parameters, value: number) => {
    onParametersChange({
      ...parameters,
      [key]: value
    })
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
        Parameters
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Temperature: {parameters.temperature}
          </label>
          <Slider
            value={parameters.temperature}
            onChange={(value) => updateParameter('temperature', value)}
            min={0}
            max={2}
            step={0.1}
            aria-label="Temperature"
          />
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Controls randomness. Lower values make responses more focused.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Max Tokens: {parameters.maxTokens}
          </label>
          <Slider
            value={parameters.maxTokens}
            onChange={(value) => updateParameter('maxTokens', value)}
            min={100}
            max={4000}
            step={100}
            aria-label="Max Tokens"
          />
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Maximum length of the response.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Top P: {parameters.topP}
          </label>
          <Slider
            value={parameters.topP}
            onChange={(value) => updateParameter('topP', value)}
            min={0}
            max={1}
            step={0.01}
            aria-label="Top P"
          />
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Controls diversity via nucleus sampling.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Frequency Penalty: {parameters.frequencyPenalty}
          </label>
          <Slider
            value={parameters.frequencyPenalty}
            onChange={(value) => updateParameter('frequencyPenalty', value)}
            min={-2}
            max={2}
            step={0.1}
            aria-label="Frequency Penalty"
          />
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Reduces likelihood of repeating the same line.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
            Presence Penalty: {parameters.presencePenalty}
          </label>
          <Slider
            value={parameters.presencePenalty}
            onChange={(value) => updateParameter('presencePenalty', value)}
            min={-2}
            max={2}
            step={0.1}
            aria-label="Presence Penalty"
          />
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">
            Increases likelihood of talking about new topics.
          </p>
        </div>
      </div>
    </div>
  )
}
